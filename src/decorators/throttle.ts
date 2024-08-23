import { Request, Response, NextFunction } from 'express';

const rateLimits: Record<string, { count: number; lastRequest: number }> = {};

function isRateLimited(key: string, limit: number, timeWindow: number): boolean {
  const currentTime = Date.now();
  const rateLimit = rateLimits[key];

  if (!rateLimit) {
    rateLimits[key] = { count: 1, lastRequest: currentTime };
    return false;
  }

  const timeSinceLastRequest = currentTime - rateLimit.lastRequest;

  if (timeSinceLastRequest > timeWindow) {
    rateLimits[key] = { count: 1, lastRequest: currentTime };
    return false;
  }

  rateLimit.lastRequest = currentTime;
  rateLimit.count++;

  return rateLimit.count > limit;
}

export function Throttle(limit: number, timeWindow: number): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as (...args: any[]) => Promise<any>;

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      const [req, res, next] = args as [Request, Response, NextFunction];
      const userKey = req.ip || 'unknown'; // Asignar un valor por defecto si req.ip es undefined

      if (isRateLimited(userKey, limit, timeWindow)) {
        return res.status(429).send('Too many requests, please try again later.');
      }

      return originalMethod.apply(this, args);
    } as unknown as T;
  };
}
