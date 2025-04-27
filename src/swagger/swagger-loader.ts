import { SwaggerDocument } from "../interfaces/swagger.interface";
import fs from "fs";
import path from "path";

export function loadSwaggerDocuments(
  basePath: string,
  swaggerDocuments: SwaggerDocument
): SwaggerDocument {
  const moduleDirs = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const moduleDir of moduleDirs) {
    const modulePath = path.join(basePath, moduleDir);
    const swaggerFiles = fs
      .readdirSync(modulePath)
      .filter((file) => file.endsWith(".swagger.ts"));

    for (const file of swaggerFiles) {
      const filePath = path.join(modulePath, file);
      const { swaggerDocument } = require(filePath);

      if (swaggerDocument) {
        swaggerDocuments.tags.push(...swaggerDocument.tags);
        swaggerDocuments.components.schemas = {
          ...swaggerDocuments.components.schemas,
          ...swaggerDocument.components.schemas,
        };

        for (const [pathKey, pathValue] of Object.entries(
          swaggerDocument.paths
        )) {
          const newKey = `${env.apiEntryPoint}${pathKey}`;
          swaggerDocuments.paths[newKey] = pathValue;
        }
      }
    }
  }

  return swaggerDocuments;
}
