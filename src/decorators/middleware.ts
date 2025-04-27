import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

export function Middleware(middlewareName: keyof any): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];

    const boundMiddleware = function (
      this: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const instance = this as any;
      const method = instance[middlewareName];

      if (typeof method === "function") {
        method.call(instance, req, res, next);
      } else {
        throw new Error(
          `Middleware method ${String(middlewareName)} not found`
        );
      }
    };

    middlewares.push(boundMiddleware.bind(target));
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}

export function UseMiddleware(
  middleware: (req: Request, res: Response, next: NextFunction) => void
): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const middlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];
    middlewares.push(middleware);

    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
  };
}

export function resolveParams(
  target: any,
  methodName: string,
  req: Request,
  res: Response,
  next: NextFunction
): any[] {
  const methodParams = Reflect.getMetadata("params", target, methodName) || [];
  const params = new Array(methodParams.length);

  methodParams.forEach((param: any) => {
    switch (param.type) {
      case "param":
        params[param.index] = req.params[param.name];
        break;
      case "query":
        params[param.index] = req.query[param.name];
        break;
      case "body":
        const dtoInstance = Object.assign(new param.dtoClass(), req.body);
        const errors = validateDto(dtoInstance);

        if (errors.length > 0) {
          res.status(400).json({ errors });
          return null;
        }

        params[param.index] = dtoInstance;
        break;
      case "res":
        params[param.index] = res;
        break;
      case "req":
        params[param.index] = req;
        break;
      case "header":
        params[param.index] = param.name
          ? req.headers[param.name.toLowerCase()]
          : req.headers;
        break;
      default:
        break;
    }
  });

  return params;
}

function validateDto(dtoInstance: any): string[] {
  const errors: string[] = [];
  
  for (const propertyKey in dtoInstance) {
    const validations =
      Reflect.getMetadata("validations", dtoInstance, propertyKey) || [];

    const value = dtoInstance[propertyKey];

    let isOptional = false;

    validations.forEach((validation: any) => {
      if (validation.type === "optional") {
        isOptional = true;
      }
    });

    if (isOptional && (value === undefined || value === null)) {
      continue;
    }

    validations.forEach((validation: any) => {
      switch (validation.type) {
        case "string":
          if (typeof value !== "string") {
            errors.push(`${propertyKey} must be a string.`);
          }
          break;
        case "int":
          if (!Number.isInteger(value)) {
            errors.push(`${propertyKey} must be an integer.`);
          }
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.push(`${propertyKey} must be a valid email.`);
          }
          break;
        case "minLength":
          if (typeof value === "string" && value.length < validation.value) {
            errors.push(
              `${propertyKey} must be at least ${validation.value} characters long.`
            );
          }
          break;
        case "maxLength":
          if (typeof value === "string" && value.length > validation.value) {
            errors.push(
              `${propertyKey} must be no more than ${validation.value} characters long.`
            );
          }
          break;
        case "min":
          if (typeof value === "number" && value < validation.value) {
            errors.push(`${propertyKey} must be at least ${validation.value}.`);
          }
          break;
        case "max":
          if (typeof value === "number" && value > validation.value) {
            errors.push(
              `${propertyKey} must be no more than ${validation.value}.`
            );
          }
          break;
        default:
          break;
      }
    });
  }

  return errors;
}
