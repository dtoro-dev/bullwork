import { Request, Response, NextFunction } from "express";

export function Authorize(roles: string[]): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    const originalMethod = (descriptor.value as unknown) as (
      ...args: any[]
    ) => Promise<any>;

    descriptor.value = (async function (
      this: any,
      ...args: any[]
    ): Promise<any> {
      const [req, res, next] = args as [Request, Response, NextFunction];
      const userRole = res.locals.user?.role;

      console.log("User Role in Authorize:", userRole);

      if (!userRole) {
        return res.status(401).send("Unauthorized");
      }

      if (!roles.includes(userRole)) {
        return res.status(403).send("Forbidden");
      }

      return originalMethod.apply(this, args);
    } as unknown) as T;
  };
}
