import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.SW_NAME_DOC || "undefined",
      version: process.env.SW_VERSION_DOC || "undefined",
    },
  },
  apis: ["./src/app/**/*.routes.ts", "./src/app/**/*.swagger.ts"],
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
