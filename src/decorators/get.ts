import 'reflect-metadata';

export function Get(path: string): MethodDecorator {
  return (target, propertyKey) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'get', path, handler: propertyKey });
    Reflect.defineMetadata('routes', routes, target);
  };
}
