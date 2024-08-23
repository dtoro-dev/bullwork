import 'reflect-metadata';
import kleur from 'kleur';

export function Controller(basePath: string = ''): ClassDecorator {
  return (target: Function) => {
    if (!basePath || typeof basePath !== 'string') {
      throw new Error(kleur.red(`Invalid basePath for controller ${target.name}. It must be a non-empty string.`));
    }

    if (!Reflect.hasMetadata('routes', target.prototype)) {
      Reflect.defineMetadata('routes', [], target.prototype);
    }

    Reflect.defineMetadata('basePath', basePath, target);

    console.log(kleur.blue(`Controller registered: ${target.name} with basePath: ${basePath}`));
  };
}
