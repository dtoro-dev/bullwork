export function CircuitBreaker(failureThreshold: number, resetTimeout: number): MethodDecorator {
  let failureCount = 0;
  let isOpen = false;

  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as (...args: any[]) => Promise<any>;

    if (!originalMethod) {
      throw new Error(`Method ${String(propertyKey)} is not defined`);
    }

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      if (isOpen) {
        throw new Error('Circuit breaker is open. Please try again later.');
      }

      try {
        const result = await originalMethod.apply(this, args);
        failureCount = 0;
        return result;
      } catch (error) {
        failureCount++;
        if (failureCount >= failureThreshold) {
          isOpen = true;
          setTimeout(() => isOpen = false, resetTimeout);
        }
        throw error;
      }
    } as unknown as T;
  };
}
