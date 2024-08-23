import 'reflect-metadata';

export function Configurable(options?: { envPrefix?: string }): ClassDecorator {
  return (target: any) => {
    if (options?.envPrefix) {
      Object.keys(process.env).forEach(key => {
        if (key.startsWith(options.envPrefix!)) {
          const propertyKey = key.replace(options.envPrefix!, '').toLowerCase();
          target.prototype[propertyKey] = process.env[key];
        }
      });
    }
  };
}

export function ConfigurableProperty(envVariable: string): PropertyDecorator {
  return (target: Record<string, any>, propertyKey: string | symbol) => {
    target[propertyKey as string] = process.env[envVariable];
  };
}