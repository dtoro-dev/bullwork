import Container from "@core/container";
import { Constructor } from "@interfaces/constructor.type";
import { InjectedParameter } from "@interfaces/injected.interface";

const container = new Container();

export function Injectable(): ClassDecorator {
  return (target: any) => {
    const instance = resolveDependencies(target);
    container.register(target, instance);
  };
}

export function Inject<T>(token: new () => T): PropertyDecorator {
  return (target, propertyKey) => {
    const instance = container.resolve(token);
    Object.defineProperty(target, propertyKey, {
      value: instance,
      writable: false,
    });
  };
}

export function resolveDependencies<T>(constructor: Constructor<T>): T {
  // Obtener los tipos de parámetros del constructor a través de los metadatos de diseño
  const paramTypes: Constructor<any>[] = Reflect.getMetadata('design:paramtypes', constructor) || [];

  // Crear una instancia de cada dependencia utilizando el contenedor
  const dependencies = paramTypes.map((paramType, index) => {
    try {
      const resolvedDependency = container.resolve(paramType);

      if (!resolvedDependency) {
        throw new Error(`No se pudo resolver la dependencia en el índice ${index} para ${constructor.name}.`);
      }

      return resolvedDependency;
    } catch (error) {
      console.error(`Error al resolver la dependencia para ${paramType.name}:`, error);
      throw new Error(`Fallo al resolver las dependencias para ${constructor.name}.`);
    }
  });

  // Retornar una nueva instancia de la clase inyectada con las dependencias resueltas
  return new constructor(...dependencies);
}