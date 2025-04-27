import { Request, Response, NextFunction } from "express";

const publicRoutes: string[] = [];

export function Private(roles?: (number | string)[]): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value as Function;

    descriptor.value = async function (...args: any[]) {
      const res: Response = args.find(
        (a) => typeof a?.status === "function" && typeof a?.json === "function"
      );
      const req: Request = res?.req; // <- aquí el cambio clave
      const next: NextFunction = args.find((a) => typeof a === "function");

      if (!req || !res) {
        console.error("⛔ No se pudo encontrar req o res en los argumentos");
        return;
      }

      if (publicRoutes.includes(req.path)) {
        return next();
      }

      const authHeader = req.headers.authorization;

      // if (!authHeader || !authHeader.startsWith("Bearer ")) {
      //   return res.status(401).json({ message: "Token requerido" });
      // }

      // const token = authHeader.split(" ")[1];

      try {
        // Aquí deberías verificar el token y obtener el usuario
        // Por ejemplo, usando JWT:
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // res.locals.usuario = decoded.usuario;
      } catch (error) {
        console.log(error, "error");
        return res.status(401).json({ message: "Token inválido" });
      }

      if (roles) {
        const userRole = res.locals.usuario?.rol?.nombre;

        if (!userRole) {
          return res.status(401).json({ message: "Token requerido" });
        }

        if (!roles.includes(userRole)) {
          return res.status(403).json({ message: "Acceso denegado" });
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
