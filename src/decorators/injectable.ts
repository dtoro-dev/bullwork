import Container from "@core/container";
import { Constructor } from "src/types/constructor.type";
import { InjectedParameter } from "src/types/injected.interface";

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
  const injectedParameters: InjectedParameter[] = Reflect.getMetadata('injectedParameters', constructor.prototype) || [];

  const args = injectedParameters
    .sort((a: InjectedParameter, b: InjectedParameter) => a.index - b.index)
    .map((param: InjectedParameter) => {
      const instance = container.resolve(param.target);
      console.log(`Resolved dependency: ${param.target.name} -> ${!!instance ? 'Instance found' : 'Instance not found'}`);
      return instance;
    });

  return new constructor(...args);
}