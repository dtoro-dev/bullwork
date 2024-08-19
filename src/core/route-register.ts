import { Application, NextFunction, Request, Response, Router } from 'express';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { resolveDependencies } from '@decorators/injectable';
import { resolveParams } from '@decorators/middleware';

interface RouteDefinition {
  method: keyof Router;
  path: string;
  handler: string;
}

export function registerRoutes(app: Application): void {
  const controllersDir = path.join(__dirname, '..', 'app');
  const moduleFolders = fs.readdirSync(controllersDir);

  moduleFolders.forEach((folder) => {
    const controllerPath = path.join(controllersDir, folder, `${folder}.controller.ts`);

    if (fs.existsSync(controllerPath)) {
      const { default: ControllerClass } = require(controllerPath);
      if (!ControllerClass) {
        console.warn(`No controller class found in ${controllerPath}`);
        return;
      }

      const controllerInstance = resolveDependencies(ControllerClass);
      if (!controllerInstance) {
        console.error(`Failed to resolve dependencies for ${ControllerClass.name}`);
        return;
      }

      const basePath = Reflect.getMetadata('basePath', ControllerClass);
      if (!basePath) {
        console.warn(`No base path defined for ${ControllerClass.name}`);
        return;
      }

      const routes: RouteDefinition[] = Reflect.getMetadata('routes', ControllerClass.prototype) || [];
      if (routes.length === 0) {
        console.warn(`No routes found for ${ControllerClass.name}`);
        return;
      }

      const router = Router();

      routes.forEach((route) => {
        const { method, path, handler } = route;
        const routeHandler = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const args = resolveParams(controllerInstance, handler, req, res);
            const result = await (controllerInstance as any)[handler](...args);
            if (!res.headersSent) {
              res.json(result);
            }
          } catch (error) {
            next(error);
          }
        };

        const routerMethod = (router[method] as any).bind(router);
        routerMethod(path, routeHandler);
      });

      app.use(basePath, router);
    }
  });
}
