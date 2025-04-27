import { DocProperties, DocPropertyOptions } from '../interfaces/doc.interface';
import 'reflect-metadata';

export function DocProperty(options: DocPropertyOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingProperties =
      Reflect.getMetadata('doc:properties', target.constructor) || {};

    existingProperties[propertyKey as string] = options;

    Reflect.defineMetadata(
      'doc:properties',
      existingProperties,
      target.constructor
    );
  };
}

export function getDtoSchema(dtoClass: any) {
  const properties: DocProperties = Reflect.getMetadata('doc:properties', dtoClass) || {};
  
  const schemaProperties: Record<string, any> = {};

  for (const [key, options] of Object.entries(properties)) {
    const typedOptions = options as DocPropertyOptions;

    schemaProperties[key] = {
      type: typedOptions.type.name.toLowerCase(),
      description: typedOptions.description,
      example: typedOptions.example,
    };

    if (typedOptions.required) {
      schemaProperties[key].required = true;
    }
  }

  return {
    type: 'object',
    properties: schemaProperties,
  };
}