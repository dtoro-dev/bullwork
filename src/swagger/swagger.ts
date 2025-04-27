import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { loadSwaggerDocuments } from "./swagger-loader";
import path from "path";
import { SwaggerDocument } from "../interfaces/swagger.interface";

export function setupSwagger(
  app: Application,
  swaggerDocuments: SwaggerDocument
): void {
  const basePath = path.join(process.cwd(), "src", "app");
  const combinedSwaggerDocument = loadSwaggerDocuments(
    basePath,
    swaggerDocuments
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(combinedSwaggerDocument)
  );
}

export { SwaggerDocument };