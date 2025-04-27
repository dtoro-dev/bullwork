import "reflect-metadata";

const getParamNames = (func: Function): string[] => {
  const fnStr = func.toString().replace(/\/\*.*?\*\//g, '');
  const result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(/([^\s,]+)/g);
  return result === null ? [] : result;
}

export function Res(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "res",
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Req(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "req",
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Param(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);
    const finalParamName = paramNames[parameterIndex];

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "param",
      name: finalParamName,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}


export function Query(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);
    const finalParamName = paramNames[parameterIndex];

    const existingParams =
      Reflect.getMetadata("queries", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "query",
      name: finalParamName,
    });

    Reflect.defineMetadata("queries", existingParams, target, propertyKey);
  };
}

export function Body(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    const dtoClass = paramTypes[parameterIndex];

    const existingParams = Reflect.getMetadata("params", target, propertyKey) || [];

    existingParams.push({
      index: parameterIndex,
      type: "body",
      dtoClass,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Headers(headerName?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    const isAllHeaders = headerName === undefined;

    existingParams.push({
      index: parameterIndex,
      type: "header",
      name: isAllHeaders ? null : headerName || paramNames[parameterIndex],
      all: isAllHeaders,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Cookies(cookieName?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    const isAllCookies = cookieName === undefined;

    existingParams.push({
      index: parameterIndex,
      type: "cookie",
      name: isAllCookies ? null : cookieName || paramNames[parameterIndex],
      all: isAllCookies,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Files(fileName?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    const isAllFiles = fileName === undefined;

    existingParams.push({
      index: parameterIndex,
      type: "file",
      name: isAllFiles ? null : fileName || paramNames[parameterIndex],
      all: isAllFiles,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}

export function Session(sessionName?: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error("Property key is undefined");
    }

    const paramNames = getParamNames((target as Record<string, Function>)[propertyKey as string]);

    const existingParams =
      Reflect.getMetadata("params", target, propertyKey) || [];

    const isAllSession = sessionName === undefined;

    existingParams.push({
      index: parameterIndex,
      type: "session",
      name: isAllSession ? null : sessionName || paramNames[parameterIndex],
      all: isAllSession,
    });

    Reflect.defineMetadata("params", existingParams, target, propertyKey);
  };
}
