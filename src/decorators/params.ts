import "reflect-metadata";

export function Res(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey === undefined) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({ index: parameterIndex, type: "res" });
    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Req(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey === undefined) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({ index: parameterIndex, type: "req" });
    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Param(paramName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey === undefined) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "param",
      name: paramName,
    });
    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Query(paramName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      const existingParams =
        Reflect.getMetadata("queries", target, propertyKey) || [];
      existingParams.push({
        index: parameterIndex,
        type: "query",
        name: paramName,
      });
      Reflect.defineMetadata("queries", existingParams, target, propertyKey);
    }
  };
}

export function Body(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey === undefined) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata(
        "params",
        target,
        propertyKey
      ) || [];

    existingParams.push({ index: parameterIndex, type: "body" });
    Reflect.defineMetadata(
      "params",
      existingParams,
      target,
      propertyKey
    );
  };
}

export { Response as ResType, Request as ReqType } from "express";
