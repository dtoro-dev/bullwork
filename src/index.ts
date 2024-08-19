import 'dotenv/config';
import { Server } from '@core/server';
import { setupSwagger } from "@swagger/swagger";
import { registerRoutes } from '@core/route-register';

const server = new Server();

registerRoutes(server.getApp());
setupSwagger(server.getApp());

server.start(Number(process.env.PORT) || 3000);