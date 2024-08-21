import { ModuleOptions } from '../types/module.interface';
import 'reflect-metadata';

export function Module(options: ModuleOptions): ClassDecorator {
  return (target) => {
    if (options.controllers) {
      Reflect.defineMetadata('controllers', options.controllers, target);
    }
    if (options.providers) {
      Reflect.defineMetadata('providers', options.providers, target);
    }
    if (options.imports) {
      Reflect.defineMetadata('imports', options.imports, target);
    }
  };
}