import { Application, NextFunction, Request, Response, Router } from "express";
import "reflect-metadata";
import fs from "fs";
import path from "path";
import { resolveDependencies } from "../decorators/injectable";
import { resolveParams } from "../decorators/middleware";
import { RouteDefinition } from "../interfaces/router.interface";
import kleur from "kleur";

export function registerRoutes(
  app: Application
): void {
  
  const controllersDir = path.join(process.cwd(), "src", "app");

  if (!fs.existsSync(controllersDir)) {
    console.warn(
      kleur.cyan(`'app' directory not found.`)
    );

    console.info(
      kleur.cyan(
        `Run 'bull run generate:module <module-name>' to create a module.`
      )
    );

    return;
  }

  const moduleFolders = fs.readdirSync(controllersDir);

  if (moduleFolders.length === 0) {
    console.warn(
      kleur.cyan(
        `No modules found in the 'app' directory. Please create a module to continue.`
      )
    );
    console.info(
      kleur.cyan(
        `Run 'bull run generate:module <module-name>' to create a module.`
      )
    );
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

      registerControllerRoutes(app, ControllerClass);
    }
  });
}

export const registerControllerRoutes = (
  app: Application,
  ControllerClass: any,
  parentPath: string = ""
): void => {
  const controllerInstance = resolveDependencies(ControllerClass);

  if (!controllerInstance) {
    console.error(
      kleur.red(`Failed to resolve dependencies for ${ControllerClass.name}`)
    );
    return;
  }

  const basePath: string = Reflect.getMetadata("basePath", ControllerClass);
  if (!basePath) {
    console.warn(kleur.red(`No base path defined for ${ControllerClass.name}`));
    return;
  }

  const fullPath = `${parentPath}${basePath}`;
  const routes: RouteDefinition[] =
    Reflect.getMetadata("routes", ControllerClass.prototype) || [];

  const router = Router();

  routes.forEach((route) => {
    const { method, path, handler } = route;

    const middlewares =
      Reflect.getMetadata("middlewares", ControllerClass.prototype, handler) ||
      [];

    const routeHandler = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const args = resolveParams(controllerInstance, handler, req, res, next);
        if (!args || res.statusCode === 400) return;

        const result = await (controllerInstance as any)[handler](...args);
        if (!res.headersSent) res.json(result);
      } catch (error) {
        next(error);
      }
    };

    const routerMethod = (router[method] as any).bind(router);
    routerMethod(path, ...middlewares, routeHandler);
  });

  app.use(`${(global as any).env.apiEntryPoint}${fullPath}`, router);

  const subControllers: any[] =
    Reflect.getMetadata("subControllers", ControllerClass) || [];
  subControllers.forEach((subCtrl) => {
    registerControllerRoutes(app, subCtrl, fullPath);
  });
};
