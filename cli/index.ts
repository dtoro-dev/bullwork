import fs from "fs";
import path from "path";

const command = process.argv[2];
const moduleName = process.argv[3];

if (!moduleName) {
  console.error("Por favor, proporciona el nombre del módulo.");
  process.exit(1);
}

const moduleDirPath = path.join("src", "app", moduleName);
const testsDirPath = path.join("src", "tests", moduleName);

if (command === "generate:module") {
  // Crear la carpeta del módulo
  if (!fs.existsSync(moduleDirPath)) {
    fs.mkdirSync(moduleDirPath, { recursive: true });
    console.log(`Módulo ${moduleName} creado en ${moduleDirPath}.`);
  }

  // Crear los archivos del módulo con contenido de ejemplo
  const filesToCreate = [
    {
      dir: moduleDirPath,
      file: `${moduleName}.controller.ts`,
      content: getControllerContent(moduleName),
    },
    {
      dir: moduleDirPath,
      file: `${moduleName}.routes.ts`,
      content: getRoutesContent(moduleName),
    },
    {
      dir: moduleDirPath,
      file: `${moduleName}.service.ts`,
      content: getServiceContent(moduleName),
    },
    {
      dir: moduleDirPath,
      file: `${moduleName}.dto.ts`,
      content: getDtoContent(moduleName),
    },
    {
      dir: moduleDirPath,
      file: `${moduleName}.interface.ts`,
      content: getInterfaceContent(moduleName),
    },
  ];

  filesToCreate.forEach(({ dir, file, content }) => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`Archivo creado: ${filePath}`);
    }
  });

  // Asegurarse de que la carpeta 'tests' exista dentro de src
  if (!fs.existsSync(testsDirPath)) {
    fs.mkdirSync(testsDirPath, { recursive: true });
    console.log(`Carpeta de pruebas creada: ${testsDirPath}`);
  }

  // Generar archivo de prueba
  const testFilePath = path.join(testsDirPath, `${moduleName}.test.ts`);
  if (!fs.existsSync(testFilePath)) {
    const testContent = getTestContent(moduleName);
    fs.writeFileSync(testFilePath, testContent, "utf8");
    console.log(`Archivo de prueba ${testFilePath} creado.`);
  }
} else if (command === "remove:module") {
  // Eliminar la carpeta del módulo
  if (fs.existsSync(moduleDirPath)) {
    fs.rmSync(moduleDirPath, { recursive: true, force: true });
    console.log(`Módulo ${moduleName} eliminado de ${moduleDirPath}.`);
  } else {
    console.log(`Módulo ${moduleName} no encontrado en ${moduleDirPath}.`);
  }

  // Eliminar la carpeta de pruebas
  if (fs.existsSync(testsDirPath)) {
    fs.rmSync(testsDirPath, { recursive: true, force: true });
    console.log(
      `Pruebas para el módulo ${moduleName} eliminadas de ${testsDirPath}.`
    );
  } else {
    console.log(
      `Pruebas para el módulo ${moduleName} no encontradas en ${testsDirPath}.`
    );
  }
} else {
  console.log("Comando no reconocido.");
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getControllerContent(moduleName: string): string {
  const className = capitalize(moduleName) + "Controller";
  return `import { ${capitalize(
    moduleName
  )}Service } from './${moduleName}.service';
import { Request, Response } from 'express';

export class ${className} {
  constructor(private ${moduleName}Service: ${capitalize(moduleName)}Service) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const data = await this.${moduleName}Service.findAll();
    res.json(data);
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await this.${moduleName}Service.findOne(id);
    res.json(data);
  }

  async create(req: Request, res: Response): Promise<void> {
    const dto = req.body;
    const data = await this.${moduleName}Service.create(dto);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto = req.body;
    const data = await this.${moduleName}Service.update(id, dto);
    res.json(data);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.${moduleName}Service.delete(id);
    res.status(204).send();
  }
}`;
}

// function getRoutesContent(moduleName: string): string {
//   return `import { Router } from 'express';
// import { ${capitalize(
//     moduleName
//   )}Controller } from './${moduleName}.controller';
// import { ${capitalize(moduleName)}Service } from './${moduleName}.service';

// const router = Router();
// const controller = new ${capitalize(moduleName)}Controller(new ${capitalize(
//     moduleName
//   )}Service());

// router.get('/', controller.getAll.bind(controller));
// router.get('/:id', controller.getOne.bind(controller));
// router.post('/', controller.create.bind(controller));
// router.put('/:id', controller.update.bind(controller));
// router.delete('/:id', controller.delete.bind(controller));

// export default router;`;
// }

function getRoutesContent(moduleName: string): string {
  return `import { Router } from 'express';
import { ${capitalize(
    moduleName
  )}Controller } from './${moduleName}.controller';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';

const router = Router();
const controller = new ${capitalize(moduleName)}Controller(new ${capitalize(
    moduleName
  )}Service());

/**
 * @swagger
 * tags:
 *   name: ${capitalize(moduleName)}
 *   description: API endpoints for managing ${moduleName}
 */

/**
 * @swagger
 * /${moduleName}:
 *   get:
 *     summary: Retrieve a list of ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     responses:
 *       200:
 *         description: A list of ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/${capitalize(moduleName)}'
 */
router.get('/', controller.getAll.bind(controller));

/**
 * @swagger
 * /${moduleName}/{id}:
 *   get:
 *     summary: Retrieve a single ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */
router.get('/:id', controller.getOne.bind(controller));

/**
 * @swagger
 * /${moduleName}:
 *   post:
 *     summary: Create a new ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Create${capitalize(moduleName)}Dto'
 *     responses:
 *       201:
 *         description: The created ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /${moduleName}/{id}:
 *   put:
 *     summary: Update an existing ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update${capitalize(moduleName)}Dto'
 *     responses:
 *       200:
 *         description: The updated ${moduleName}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${capitalize(moduleName)}'
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /${moduleName}/{id}:
 *   delete:
 *     summary: Delete an existing ${moduleName}
 *     tags: [${capitalize(moduleName)}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: ${capitalize(moduleName)} deleted
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;`;
}


function getServiceContent(moduleName: string): string {
  return `import { ${capitalize(moduleName)} } from './${moduleName}.interface';

export class ${capitalize(moduleName)}Service {
  private data: ${capitalize(moduleName)}[] = [];

  async findAll(): Promise<${capitalize(moduleName)}[]> {
    return this.data;
  }

  async findOne(id: string): Promise<${capitalize(moduleName)} | undefined> {
    return this.data.find(item => item.id === id);
  }

  async create(dto: any): Promise<${capitalize(moduleName)}> {
    const newItem = { id: Math.random().toString(), ...dto };
    this.data.push(newItem);
    return newItem;
  }

  async update(id: string, dto: any): Promise<${capitalize(
    moduleName
  )} | undefined> {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...dto };
      return this.data[index];
    }
    return undefined;
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter(item => item.id !== id);
  }
}`;
}

function getDtoContent(moduleName: string): string {
  return `export interface Create${capitalize(moduleName)}Dto {
  // define the properties for the create DTO
  name: string;
}

export interface Update${capitalize(moduleName)}Dto {
  // define the properties for the update DTO
  name?: string;
}`;
}

function getInterfaceContent(moduleName: string): string {
  return `export interface ${capitalize(moduleName)} {
  id: string;
  name: string;
}`;
}

function getTestContent(moduleName: string): string {
  return `import { ${capitalize(
    moduleName
  )}Controller } from '../app/${moduleName}/${moduleName}.controller';
import { ${capitalize(
    moduleName
  )}Service } from '../app/${moduleName}/${moduleName}.service';

describe('${capitalize(moduleName)} Controller', () => {
  let controller: ${capitalize(moduleName)}Controller;

  beforeEach(() => {
    controller = new ${capitalize(moduleName)}Controller(new ${capitalize(
    moduleName
  )}Service());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});`;
}
