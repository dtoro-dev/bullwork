import { schedule } from 'node-cron';

export function Schedule(cronExpression: string): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    if (!descriptor.value) {
      throw new Error(`Method ${String(propertyKey)} is not defined`);
    }

    schedule(cronExpression, async () => {
      await (descriptor.value as unknown as () => Promise<any>).apply(target);
    });
  };
}
