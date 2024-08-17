import 'dotenv/config';
import { Server } from './src/core/server';
import { setupSwagger } from './src/swagger/swagger';

const server = new Server();

server.loadRoutes();

setupSwagger(server['app']);

server.start(Number(process.env.PORT) || 3000); 