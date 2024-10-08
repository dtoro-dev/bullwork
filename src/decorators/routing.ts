function createMethodDecorator(method: string) {
  return function(path: string): MethodDecorator {
    return (target, propertyKey) => {
      const routes = Reflect.getMetadata('routes', target) || [];
      routes.push({ method, path, handler: propertyKey });
      Reflect.defineMetadata('routes', routes, target);
    };
  };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Patch = createMethodDecorator('patch');
export const Delete = createMethodDecorator('delete');