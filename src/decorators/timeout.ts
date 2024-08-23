export function Timeout(duration: number): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as (...args: any[]) => Promise<any>;

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Request timed out'));
        }, duration);

        Promise.resolve(originalMethod.apply(this, args))
          .then(resolve)
          .catch(reject)
          .finally(() => clearTimeout(timeoutId));
      });
    } as unknown as T;
  };
}
