import "reflect-metadata";

export function IsString(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "string" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsInt(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "int" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsEmail(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "email" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function MinLength(min: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "minLength", value: min });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function MaxLength(max: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "maxLength", value: max });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function Min(min: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "min", value: min });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function Max(max: number): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "max", value: max });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsOptional(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "optional" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

// New Decorators

export function IsBoolean(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "boolean" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsNumber(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "number" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsDate(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "date" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsArray(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "array" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function ArrayNotEmpty(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "arrayNotEmpty" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsEnum(enumType: object): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "enum", enumType });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function Matches(
  regex: RegExp,
  options?: { message?: string }
): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "matches", regex, message: options?.message });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}

export function IsUUID(): PropertyDecorator {
  return (target, propertyKey) => {
    const validations =
      Reflect.getMetadata("validations", target, propertyKey) || [];
    validations.push({ type: "uuid" });
    Reflect.defineMetadata("validations", validations, target, propertyKey);
  };
}
