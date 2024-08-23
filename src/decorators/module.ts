import 'reflect-metadata';
import Container from '@core/container';
import { ModuleOptions } from '@interfaces/module.interface';
import { Constructor } from '@interfaces/constructor.type';
import { resolveDependencies } from './injectable';

// Instancia del contenedor de dependencias
const container = new Container();

export function Module(options: ModuleOptions): ClassDecorator {
  return (target: Function) => {
    // Registra los controladores y proveedores en el contenedor
    if (options.providers) {
      options.providers.forEach((provider: Constructor<any>) => {
        container.register(provider, resolveDependencies(provider));
      });
    }

    if (options.controllers) {
      options.controllers.forEach((controller: Constructor<any>) => {
        container.register(controller, resolveDependencies(controller));
      });
    }

    // Manejo de módulos importados
    if (options.imports) {
      options.imports.forEach((importedModule: Constructor<any>) => {
        const providers = Reflect.getMetadata('providers', importedModule) || [];
        const controllers = Reflect.getMetadata('controllers', importedModule) || [];

        providers.forEach((provider: Constructor<any>) => {
          container.register(provider, resolveDependencies(provider));
        });

        controllers.forEach((controller: Constructor<any>) => {
          container.register(controller, resolveDependencies(controller));
        });
      });
    }

    // Define los metadatos para el módulo
    Reflect.defineMetadata('controllers', options.controllers || [], target);
    Reflect.defineMetadata('providers', options.providers || [], target);
    Reflect.defineMetadata('imports', options.imports || [], target);
  };
}
