import { InMemoryCacheStore } from "../core/memory-cache-store";
import { AsyncFunction } from "../interfaces/async.type";
import { CacheStore } from "../interfaces/cache-store";

export function Cacheable(duration: number, cacheStore: CacheStore = new InMemoryCacheStore()): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as AsyncFunction;

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      const cacheKey = `${propertyKey.toString()}_${JSON.stringify(args)}`;
      const cachedData = await cacheStore.get(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for key: ${cacheKey}`);
        return cachedData;
      }

      console.log(`Cache miss for key: ${cacheKey}`);
      const result = await originalMethod.apply(this, args);
      await cacheStore.set(cacheKey, result, duration);
      return result;
    } as unknown as T;
  };
};