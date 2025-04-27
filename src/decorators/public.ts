const publicRoutes: string[] = [];

export function Public(): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name.replace("Controller", "");
    const route = `${env.apiEntryPoint}/${className.toLowerCase()}/${String(propertyKey)}`;
    
    publicRoutes.push(route);
    
    return descriptor;
  };
}
