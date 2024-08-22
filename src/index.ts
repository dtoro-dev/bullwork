import '@core/environment.config';
import { Server } from '@core/server';
import { setupSwagger } from "@swagger/swagger";
import { registerRoutes } from '@core/route-register';

const server = new Server();

registerRoutes(server.getApp());
setupSwagger(server.getApp());

server.start(global.config.port);