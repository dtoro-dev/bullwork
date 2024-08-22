import 'dotenv/config';
import 'reflect-metadata';
import { EnvOptions } from '@interfaces/env.interface';

export function Env<T = string>(
  envVarName: string,
  options?: EnvOptions<T>
): PropertyDecorator {
  return (target, propertyKey) => {
    const envValue = process.env[envVarName];

    let finalValue: T | undefined;

    if (envValue !== undefined) {
      try {
        finalValue = options?.parse ? options.parse(envValue) : (envValue as unknown as T);
      } catch (error) {
        throw new Error(`Failed to parse environment variable ${envVarName}: ${error}`);
      }
    } else if (options?.defaultValue !== undefined) {
      finalValue = options.defaultValue;
    } else if (options?.required) {
      throw new Error(`Environment variable ${envVarName} is required but not set.`);
    }

    Reflect.defineMetadata(propertyKey as string, finalValue, target);

    Object.defineProperty(target, propertyKey, {
      get: () => Reflect.getMetadata(propertyKey as string, target),
      enumerable: true,
      configurable: true,
    });
  };
}