import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { loadSwaggerDocuments } from "./swagger-loader";
import path from "path";

export function setupSwagger(app: Application): void {
  const basePath = path.join(__dirname, "../app");
  const combinedSwaggerDocument = loadSwaggerDocuments(basePath);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(combinedSwaggerDocument));
}