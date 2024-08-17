import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    './src/app/**/*.routes.ts', // Asegúrate de que esta ruta apunta correctamente a tus archivos de rutas
  ],
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
