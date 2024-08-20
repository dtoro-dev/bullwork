import "reflect-metadata";

export function IsString(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "string",
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsInt(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "int",
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsEmail(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "email",
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function MinLength(min: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "minLength",
      value: min,
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function MaxLength(max: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "maxLength",
      value: max,
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function Min(min: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "min",
      value: min,
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function Max(max: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "max",
      value: max,
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsOptional(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    
    validations.push({
      type: "optional",
    });

    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}
