export function Retry(attempts: number, delay: number): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as (...args: any[]) => Promise<any>;

    if (!originalMethod) {
      throw new Error(`Method ${String(propertyKey)} is not defined`);
    }

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (i < attempts - 1) {
            await new Promise(res => setTimeout(res, delay));
          } else {
            throw error;
          }
        }
      }
    } as unknown as T;
  };
}
