import fs from 'fs';
import path from 'path';

export function loadSwaggerDocuments(basePath: string): SwaggerDocument {
  const apiEntryPoint = config.apiEntryPoint;  // Define el apiEntryPoint aquí

  const swaggerDocuments: SwaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: config.swaggerNameDoc,
      version: config.swaggerVersionDoc,
    },
    tags: [],
    components: {
      schemas: {},
    },
    paths: {},
  };

  // Leer subdirectorios dentro de `basePath`
  const moduleDirs = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const moduleDir of moduleDirs) {
    const modulePath = path.join(basePath, moduleDir);
    const swaggerFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.swagger.ts'));

    for (const file of swaggerFiles) {
      const filePath = path.join(modulePath, file);
      const { swaggerDocument } = require(filePath);

      if (swaggerDocument) {
        swaggerDocuments.tags.push(...swaggerDocument.tags);
        swaggerDocuments.components.schemas = {
          ...swaggerDocuments.components.schemas,
          ...swaggerDocument.components.schemas,
        };

        // Ajusta las rutas para que incluyan el apiEntryPoint
        for (const [pathKey, pathValue] of Object.entries(swaggerDocument.paths)) {
          const newKey = `${apiEntryPoint}${pathKey}`;
          swaggerDocuments.paths[newKey] = pathValue;
        }
      }
    }
  }

  return swaggerDocuments;
}
