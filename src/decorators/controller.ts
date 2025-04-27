import 'reflect-metadata';
import kleur from 'kleur';
import { Constructor } from '../interfaces/constructor.type';

export function Controller(basePath: string = '', subControllers: Constructor[] = []): ClassDecorator {
  return (target: Function) => {
    if (!basePath || typeof basePath !== 'string') {
      throw new Error(kleur.red(`Invalid basePath for controller ${target.name}. It must be a non-empty string.`));
    }

    if (!Reflect.hasMetadata('routes', target.prototype)) {
      Reflect.defineMetadata('routes', [], target.prototype);
    }

    Reflect.defineMetadata('basePath', basePath, target);

    if (Array.isArray(subControllers) && subControllers.length > 0) {
      Reflect.defineMetadata('subControllers', subControllers, target);
      console.log(
        kleur.blue(`Controller registered: ${target.name} with basePath: ${basePath} and ${subControllers.length} subControllers.`)
      );
    } else {
      console.log(kleur.blue(`Controller registered: ${target.name} with basePath: ${basePath}`));
    }
  };
}

