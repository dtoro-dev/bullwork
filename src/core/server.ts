import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';

export class Server {
  private app: Application;
  private serverInstance: any;

  constructor() {
    this.app = express();
  }

  public start(port: number): void {
    this.serverInstance = this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  public useRouter(router: express.Router): void {
    this.app.use(router);
  }

  public loadRoutes(): void {
    const routesPath = path.join(__dirname, '..', 'app');

    fs.readdirSync(routesPath).forEach((folder) => {
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
        });
      } else {
        resolve();
      }
    });
  }
}
