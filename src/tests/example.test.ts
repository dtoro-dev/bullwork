// src/tests/example.test.ts
import { Server } from '../core/server';
import { Router } from 'express';

describe('Server', () => {
  let server: Server;
  let router: Router;

  beforeEach(() => {
    server = new Server();
    router = Router();
  });

  afterEach(async () => {
    await server.stop(); // Espera hasta que el servidor se haya detenido
  });

  it('should start the server without errors', () => {
    expect(() => server.start(3000)).not.toThrow();
  });

  it('should be able to use a router', () => {
    expect(() => server.useRouter(router)).not.toThrow();
  });
});
