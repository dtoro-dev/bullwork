import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import kleur from 'kleur';

export class Server {
  private app: Application;
  private serverInstance: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    this.app.use(this.requestLogger);
  }

  private requestLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${kleur.cyan(req.method)} ${kleur.white(req.originalUrl)} - ${kleur.yellow(`${res.statusCode}`)} ${kleur.gray(`${duration}ms`)}`);
    });
    next();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(port: number): void {
    this.serverInstance = this.app.listen(port, () => {
      console.log(kleur.green(`Server running on port ${port}`));
    });
  }

  public useRouter(router: express.Router): void {
    this.app.use(router);
  }

  public loadRoutes(): void {
    const routesPath = path.join(__dirname, '..', 'app');

    if (!fs.existsSync(routesPath)) {
      console.log(kleur.yellow('No modules have been created yet.'));
      console.log(kleur.blue('Use the following commands to manage modules:'));
      console.log(kleur.blue('- To create a module: bull run generate:module <module-name>'));
      console.log(kleur.blue('- To remove a module: bull run remove:module <module-name>'));
      return;
    }

    const folders = fs.readdirSync(routesPath);

    if (folders.length === 0) {
      console.log(kleur.yellow('No modules have been created yet.'));
      console.log(kleur.blue('Use the following commands to manage modules:'));
      console.log(kleur.blue('- To create a module: bull run generate:module <module-name>'));
      console.log(kleur.blue('- To remove a module: bull run remove:module <module-name>'));
      return;
    }

    folders.forEach((folder) => {
      const routeFilePath = path.join(routesPath, folder, `${folder}.routes.ts`);

      if (fs.existsSync(routeFilePath)) {
        const moduleRoutes = require(routeFilePath).default;
        this.app.use(`/${folder}`, moduleRoutes);
      }
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.serverInstance) {
        this.serverInstance.close((err?: Error) => {
          if (err) {
            return reject(err);
          }
          resolve();
          console.log(kleur.red('Server stopped successfully.'));
        });
      } else {
        resolve();
      }
    });
  }
}
