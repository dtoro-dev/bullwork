type Constructor<T = any> = new (...args: any[]) => T;

const container = new Map();

export function Injectable(): ClassDecorator {
  return (target) => {
    container.set(target, new (target as unknown as Constructor)());
  };
}

export function Inject<T>(target: Constructor<T>): T {
  const instance = container.get(target);
  if (!instance) {
    throw new Error(`No instance found for ${target.name}`);
  }
  return instance;
}
