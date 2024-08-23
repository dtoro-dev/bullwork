import { Application, NextFunction, Request, Response, Router } from "express";
import "reflect-metadata";
import fs from "fs";
import path from "path";
import { resolveDependencies } from "@decorators/injectable";
import { resolveParams } from "@decorators/middleware";
import { RouteDefinition } from "@interfaces/router.interface";
import kleur from "kleur";

export function registerRoutes(app: Application): void {
  const controllersDir = path.join(__dirname, "..", "app");

  if (!fs.existsSync(controllersDir)) {
    console.warn(kleur.yellow(`'app' directory not found. Creating 'app' directory...`));

    fs.mkdirSync(controllersDir, { recursive: true });
    console.warn(
      kleur.yellow(`'app' directory created. Please create a module to continue.`)
    );

    return;
  }

  const moduleFolders = fs.readdirSync(controllersDir);

  if (moduleFolders.length === 0) {
    console.warn(
      kleur.yellow(`No modules found in the 'app' directory. Please create a module to continue.`)
    );
    console.info(kleur.blue(`Run 'bull run generate:module <module-name>' to create a module.`));
    return;
  }

  moduleFolders.forEach((folder) => {
    const controllerPath = path.join(
      controllersDir,
      folder,
      `${folder}.controller.ts`
    );

    if (fs.existsSync(controllerPath)) {
      const { default: ControllerClass } = require(controllerPath);
      if (!ControllerClass) {
        console.warn(
          kleur.red(`No controller class found in ${controllerPath}`)
        );
        return;
      }

      const controllerInstance = resolveDependencies(ControllerClass);
      if (!controllerInstance) {
        console.error(
          kleur.red(`Failed to resolve dependencies for ${ControllerClass.name}`)
        );
        return;
      }

      const basePath = Reflect.getMetadata("basePath", ControllerClass);
      if (!basePath) {
        console.warn(
          kleur.red(`No base path defined for ${ControllerClass.name}`)
        );
        return;
      }

      const routes: RouteDefinition[] =
        Reflect.getMetadata("routes", ControllerClass.prototype) || [];
      if (routes.length === 0) {
        console.warn(kleur.red(`No routes found for ${ControllerClass.name}`));
        return;
      }

      const router = Router();

      routes.forEach((route) => {
        const { method, path, handler } = route;

        const middlewares = Reflect.getMetadata("middlewares", ControllerClass.prototype, handler) || [];

        const routeHandler = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          try {
            const args = resolveParams(controllerInstance, handler, req, res);

            if (!args || res.statusCode === 400) {
              return;
            }

            const result = await (controllerInstance as any)[handler](...args);
            if (!res.headersSent) {
              res.json(result);
            }
          } catch (error) {
            next(error);
          }
        };

        const routerMethod = (router[method] as any).bind(router);

        routerMethod(path, ...middlewares, routeHandler);
      });

      const apiEntryPoint = global.config?.apiEntryPoint || "/api/v1";
      app.use(`${apiEntryPoint}${basePath}`, router);
    }
  });
}
