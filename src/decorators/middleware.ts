import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

export function Middleware(middleware: Function): MethodDecorator {
  return (target, propertyKey) => {
    const middlewares = Reflect.getMetadata('middlewares', target) || [];
    middlewares.push({ middleware, handler: propertyKey });
    Reflect.defineMetadata('middlewares', middlewares, target);
  };
}

export function resolveParams(target: any, methodName: string, req: Request, res: Response): any[] {
  const methodParams = Reflect.getMetadata('params', target, methodName) || [];
  const params = new Array(methodParams.length);
  
  methodParams.forEach((param: any) => {
    switch (param.type) {
      case 'param':
        params[param.index] = req.params[param.name];
        break;
      case 'query':
        params[param.index] = req.query[param.name];
        break;
      case 'body':
        params[param.index] = req.body;
        break;
      case 'res':
        params[param.index] = res;
        break;
      case 'req':
        params[param.index] = req;
        break;
      default:
        break;
    }
  });

  return params;
}