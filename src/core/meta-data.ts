import 'reflect-metadata';

const metadataKey = Symbol('paramsMetadata');

interface ParamMetadata {
  index: number;
  type: 'param' | 'query' | 'body';
  name?: string;
}

export function getMetadata(target: any, propertyKey: string | symbol | undefined): ParamMetadata[] {
  return Reflect.getMetadata(metadataKey, target) || [];
}

export function setMetadata(target: any, propertyKey: string | symbol | undefined, metadata: ParamMetadata[]): void {
  Reflect.defineMetadata(metadataKey, metadata, target);
}