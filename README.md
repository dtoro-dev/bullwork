<div align="center">
  <img src="https://raw.githubusercontent.com/dtoro-dev/bullwork/refs/heads/main/bullwork-large.png" />

  ## ⚡Fast Framework Backend 

  [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-%2300A3E0.svg?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![SQLite](https://img.shields.io/badge/SQLite-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
  ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

  ![GitHub stars](https://img.shields.io/github/stars/dtoro-dev/bullwork)
  ![GitHub issues](https://img.shields.io/github/issues/dtoro-dev/bullwork)
  ![GitHub forks](https://img.shields.io/github/forks/dtoro-dev/bullwork)
  ![GitHub PRs](https://img.shields.io/github/issues-pr/dtoro-dev/bullwork)
</div>

## Descripción

Bullwork es un framework ligero para backend basado en Node.js, Express, y TypeScript. Está diseñado para ofrecer una estructura sólida y escalable para aplicaciones web modernas, y se integra perfectamente con herramientas como Prisma y SQLite para la gestión de bases de datos.

## 🧱 Arquitectura de Bullwork
Bullwork está diseñado siguiendo una arquitectura modular y escalable, inspirada en conceptos de Clean Architecture, DDD (Domain-Driven Design) y prácticas modernas de frameworks como NestJS.

### ✨ Principios que sigue Bullwork:
Modular Monolith: cada módulo se estructura con sus propios controladores, servicios, DTOs, interfaces y documentación Swagger. Todo autocontenible y fácilmente escalable.

**Arquitectura en Capas**: separación clara entre rutas (controladores), lógica (servicios) y persistencia (Prisma ORM).

**Metaprogramación declarativa**: gracias a decoradores personalizados, puedes definir controladores, middlewares, validaciones y permisos de forma simple y poderosa.

**Contenedor de Dependencias**: Bullwork implementa su propio sistema de inyección de dependencias (DI), facilitando pruebas, reutilización de lógica y escalabilidad.

**Soporte para Decoradores Avanzados**: incluyendo @Authorize, @Schedule, @Retry, @Cacheable, @CircuitBreaker, entre otros.

**Entry Point centralizado**: toda la API parte desde una entrada configurable (/api/v1 por defecto), y la documentación Swagger se genera automáticamente al registrar módulos.

```⚡️ Bullwork es ideal para quienes buscan construir proyectos backend limpios, mantenibles y listos para escalar, sin sacrificar velocidad de desarrollo.```

## Características

- **Arquitectura Modular**: Soporte para módulos que permiten una organización clara y escalable del código.
- **Decoradores Personalizados**: Implementación de decoradores como `@Body`, `@Param`, `@Query`, `@Headers`, y más, para una gestión más limpia y declarativa de las rutas y parámetros.
- **Integración con Prisma**: Manejo avanzado de bases de datos con Prisma, ofreciendo una API limpia y segura para interactuar con SQLite u otros sistemas de bases de datos.
- **Documentación API con Swagger**: Generación automática de documentación API utilizando Swagger.
- **CLI Dedicada**: Bullwork se gestiona a través de la CLI de BullJS, que facilita la creación de proyectos y la administración de módulos.

## Decoradores Personalizados

Bullwork incluye un conjunto de decoradores personalizados para simplificar la gestión de rutas, parámetros, dependencias y validaciones en tu aplicación:

### Swagger & Environment

- **@DocProperty**: Documenta automáticamente las propiedades de un DTO en Swagger.
- **@Environment**: Maneja las variables de entorno de manera centralizada en la clase `environment.config`.
- **@Middleware**: Permite ejecutar un código especifico antes de que una ruta sea procesada por su controlador.
- **@Public**: Declara un endpoint publico.
- **@Private**: Declara un endpoint privado (en mantención en su defecto **@Middleware**)

### Decoradores de Métodos

- **@Get(path: string)**: Define un endpoint HTTP GET en la ruta especificada.
- **@Post(path: string)**: Define un endpoint HTTP POST en la ruta especificada.
- **@Put(path: string)**: Define un endpoint HTTP PUT en la ruta especificada.
- **@Patch(path: string)**: Define un endpoint HTTP PATCH en la ruta especificada.
- **@Delete(path: string)**: Define un endpoint HTTP DELETE en la ruta especificada.

### Decoradores de Parámetros

- **@Body()**: Extrae y valida el cuerpo de la solicitud basado en la clase DTO proporcionada.
- **@Param()**: Extrae un parámetro de la ruta.
- **@Query()**: Extrae parámetros de la query string.
- **@Headers(headerName?: string)**: Extrae un header específico o todos los headers si no se especifica un nombre.
- **@Res**: Inyecta el objeto de respuesta de Express, utilizando un decorador personalizado.
- **@Req**: Inyecta el objeto de solicitud de Express, utilizando un decorador personalizado.

### Decoradores de Validación

Bullwork incluye varios decoradores de validación para asegurar que los datos recibidos cumplan con las expectativas antes de ser procesados:

- **@IsString()**: Valida que el valor de la propiedad sea una cadena de texto.
- **@IsInt()**: Valida que el valor de la propiedad sea un número entero.
- **@IsEmail()**: Valida que el valor de la propiedad sea un correo electrónico válido.
- **@MinLength(min: number)**: Valida que la longitud mínima de una cadena de texto sea la especificada.
- **@MaxLength(max: number)**: Valida que la longitud máxima de una cadena de texto no supere la especificada.
- **@Min(min: number)**: Valida que el valor numérico sea al menos el valor especificado.
- **@Max(max: number)**: Valida que el valor numérico no exceda el valor especificado.
- **@IsOptional()**: Indica que la propiedad es opcional en la validación; si está presente, se aplican las demás reglas de validación.
- **@IsBoolean()**: Valida que la propiedad sea un valor booleano (true o false).
- **@IsNumber()**: Valida que la propiedad sea un número.
- **@IsDate()**: Valida que la propiedad sea una fecha válida.
- **@IsArray()**: Valida que la propiedad sea un arreglo.
- **@ArrayNotEmpty()**: Valida que el arreglo no esté vacío.
- **@IsEnum(enumType: object)**: Valida que la propiedad sea un valor de un enumerado específico.
- **@Matches(regex: RegExp)**: Valida que la propiedad coincida con un patrón regex.
- **@IsUUID()**: Valida que la propiedad sea un UUID válido.

### Decoradores de Inyección de Dependencias

- **@Injectable()**: Marca una clase como inyectable y registra su instancia en el contenedor de dependencias.
- **@Inject(token: new () => T)**: Inyecta una dependencia en una propiedad de una clase utilizando el contenedor de dependencias.

### Decoradores de Clases

- **@Controller(basePath: string = '')**: Define una clase como un controlador de rutas, con un `basePath` opcional para agrupar rutas relacionadas.

## Custom Decoradores en Bullwork

Bullwork ahora incluye una serie de decoradores avanzados que permiten un manejo más sofisticado de la lógica de tu aplicación. A continuación se describen los decoradores agregados junto con ejemplos prácticos de cómo utilizarlos en tu proyecto.

### Decorador `@Cacheable`
Permite almacenar en caché el resultado de un método. Cuando el método es invocado nuevamente con los mismos parámetros, se devuelve el resultado en caché en lugar de volver a ejecutar el método.

#### Uso
```typescript
import { Cacheable } from '@decorators/cacheable';

@Controller('/items')
class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  @Cacheable()
  async getAllItems(): Promise<Item[]> {
    return await this.itemService.findAll();
  }
}
```

### Decorador `@Throttle`
Limita la cantidad de veces que un método puede ser llamado en un período de tiempo específico. Es útil para prevenir el abuso de ciertos endpoints.

#### Uso
```typescript
import { Throttle } from '@decorators/throttle';

@Controller('/api')
class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/data')
  @Throttle(10, 60) // Permite 10 solicitudes por minuto
  async fetchData(): Promise<any> {
    return await this.apiService.getData();
  }
}
```

### Decorador `@Timeout`
Define un tiempo límite para la ejecución de un método. Si el método no se completa dentro del tiempo especificado, se devuelve un error.

#### Uso
```typescript
import { Timeout } from '@decorators/timeout';

@Controller('/tasks')
class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/execute')
  @Timeout(5000) // Tiempo límite de 5 segundos
  async executeTask(): Promise<any> {
    return await this.taskService.runTask();
  }
}
```

### Decorador `@Authorize`
Requiere que un usuario esté autenticado o tenga ciertos permisos antes de acceder a un método. Ideal para proteger rutas sensibles.

#### Uso
```typescript
import { Authorize } from '@decorators/authorize';

@Controller('/admin')
class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/dashboard')
  @Authorize(['admin', 'superuser']) // Solo accesible para roles admin y superuser
  async getDashboard(): Promise<any> {
    return await this.adminService.getDashboardData();
  }
}
```

### Decorador `@Transaction`
Encapsula la ejecución de un método en una transacción de base de datos. Si algo falla durante la ejecución, todos los cambios en la base de datos se revierten.

#### Uso
```typescript
import { Transaction } from '@decorators/transaction';

@Controller('/payments')
class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/process')
  @Transaction()
  async processPayment(@Body() paymentDto: PaymentDto): Promise<any> {
    return await this.paymentService.process(paymentDto);
  }
}
```

### Decorador `@Schedule`
Define un método para que se ejecute de forma programada en intervalos de tiempo específicos, como un cron job.

#### Uso
```typescript
import { Schedule } from '@decorators/schedule';

@Controller('/reports')
class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Schedule('0 0 * * *') // Ejecuta todos los días a medianoche
  async generateDailyReport(): Promise<void> {
    await this.reportService.generateDaily();
  }
}
```

### Decorador `@Retry`
Intenta ejecutar un método varias veces en caso de que falle. Es útil para operaciones que pueden fallar temporalmente, como llamadas a APIs externas.

#### Uso
```typescript
import { Retry } from '@decorators/retry';

@Controller('/notifications')
class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/send')
  @Retry(3) // Intenta hasta 3 veces en caso de fallo
  async sendNotification(@Body() notificationDto: NotificationDto): Promise<void> {
    await this.notificationService.send(notificationDto);
  }
}
```

### Decorador `@CircuitBreaker`
Implementa un patrón de cortocircuito que evita llamadas repetidas a un servicio o método que está fallando continuamente, protegiendo así tu aplicación.

#### Uso
```typescript
import { CircuitBreaker } from '@decorators/circuit-breaker';

@Controller('/api')
class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/external-data')
  @CircuitBreaker({ failureThreshold: 5, resetTimeout: 10000 })
  async fetchExternalData(): Promise<any> {
    return await this.apiService.getExternalData();
  }
}
```

### Resolución de Dependencias

- **resolveDependencies(constructor: Constructor<T>): T**: Función utilizada internamente para resolver las dependencias inyectadas en los constructores utilizando el contenedor de dependencias.

Estos decoradores y funciones están diseñados para trabajar juntos en armonía, proporcionando una base sólida para la creación de aplicaciones backend robustas y escalables utilizando Bullwork.

## Instalación

## Creación de un Nuevo Proyecto
Para crear un nuevo proyecto basado Bullwork v2.0.0, debes instalar la CLI [**bull**](https://dtoro-dev.github.io/bullcli-site/). Esta te permitirá crear de manera automática un proyecto con el framework Bullwork v2.0.0.

```bash
bull new
```
### O
```bash
bull new project-name
```

### Esto hará lo siguiente:

- 📂 Creará una nueva carpeta con el nombre del proyecto que indiques (o te preguntará si no lo especificas).

- 🛠️ Generará automáticamente toda la estructura base necesaria para comenzar tu proyecto Bullwork v2.0.0.

- 📜 Creará un archivo package.json inicializado y configurado con los scripts recomendados.

- 🔧 Creará el archivo tsconfig.json configurado para trabajar con Bullwork y TypeScript.

- 📄 Creará un archivo global.d.ts para la tipificación global de tu proyecto.

- 📝 Creará un README.md inicial explicando el proyecto.

- 🛡️ Generará automáticamente la estructura src/:

  - src/app/ (Vacío, donde irán los módulos)

  - src/orm/ (Con el archivo schema.prisma y seed.ts)

  - src/tests/ (Con un ejemplo básico example.test.ts)

  - src/main.ts (Punto de entrada del servidor)

  - src/environment.config.ts (Configuración de entorno)

- 🔥 Te preguntara si deseas instalar las dependencias (bullwork, prisma, typescript, etc), de lo contrario puedes instalarlas con:

  ```bash
  bull install
  ```

- ⚙️ Creará una carpeta config/ con los archivos de entorno:

  - env.development
  - env.production
  - env.qa
  - env.example

📂 En la carpeta config/ se creara la base de datos cuando la inicialices.

- 🚀 Dejará todo listo para que solo tengas que ejecutar ```bull dev``` y empezar a trabajar.

- Para crear módulos utiliza el comando
  ```bash
  bull generate:module <name_module>
  bull g:m <name_module> 
  ```
  Esto creara un directorio en /app y /test con el *<name_module>*, ademas de los archivos necesarios con endpoint de ejemplo. Puedes probar el endpoint con ```bull dev```

## Uso

### Iniciar el Entorno de Desarrollo

Para levantar el entorno de desarrollo:

```bash
cd project-name
bull dev
```
o
```bash
cd project-name
bull run dev
```

## Documentación API con Swagger

Bullwork incluye integración con Swagger para la documentación automática de tu API. Una vez que el entorno de desarrollo esté en funcionamiento, puedes acceder a la documentación Swagger en la siguiente URL:

```
http://localhost:5000/api-docs 
```

Esta documentación incluirá todos los endpoints disponibles en tu proyecto. Cada vez que generes un nuevo módulo, Swagger actualizará automáticamente la documentación para reflejar los endpoints CRUD del módulo creado.

 - Genera un nuevo módulo en el proyecto. Al crear un nuevo módulo, BullJS CLI te preguntará lo siguiente: `Do you want to setup a module? (y/N)`. Esta opción te permite elegir si deseas configurar el módulo con una estructura modular, agrupando controladores, servicios, y otros componentes relacionados en un solo módulo.
```bash

bull generate:module <module-name>
bull g:m <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
bull remove:module <module-name>
bull r:m <module-name>
```

 - Crear build
```bash
bull build
```

 - Instala una nueva dependencia
```bash
bull install <dependency-name>
```

 - Elimina una dependencia
```bash
bull uninstall <dependency-name>
```

## Proceso de implementación de base de datos con Prisma

 - Crear los modelos necesarios en el archivo de prisma en `/src/orm/schema.prisma`.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "/node_modules/.prisma/client"
}

// Define your schema here.
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

 - Inicializa la configuración de base de datos de prisma.

```bash
bull init
```
- Valida que la configuración este correcta.

```bash
bull prisma validate
```

 - Ejecuta comando generate para que prisma incorpore los modelos a sus dependencias.

```bash
bull prisma generate
```

 - Finalizando con la migración de configuración desarrollo, esta solicitara que se ingrese el nombre de la migración.

```bash
bull prisma migrate-dev
```

### Requisitos

- Node.js >= 20.15.1 (LTS)
- `pnpm` instalado globalmente.

## 📜 Changelog
### Versión 2.0.0
- **Bullwork ahora es una dependencia externa**:

  Ya no forma parte del código fuente de tu proyecto. Esto mantiene tu estructura de carpetas mucho más limpia y enfocada solo en tu negocio.

- **Nueva CLI Bull v2.0.0 completamente reescrita en Rust**:
  
  Ahora Bull CLI está construida con Rust para ofrecer un rendimiento ultra rápido y una experiencia de desarrollo más profesional y estable.

- **Generación optimizada de proyectos y módulos:**

  El nuevo comando bull new crea proyectos base listos para trabajar con Bullwork v2.0.0 en segundos. También puedes generar y eliminar módulos de forma más limpia y segura.

- **Integración automática de Prisma:**

  El CLI gestiona automáticamente la creación de archivos schema.prisma, seed.ts y operaciones comunes de Prisma, manteniendo la configuración organizada.

- **Proyectos aún más minimalistas y escalables:**

  Se promueve una estructura basada en módulos, tests automáticos básicos, y conexión inicial lista para bases de datos SQLite.

- **Experiencia de desarrollador mejorada:**
  Feedback claro en consola con kleur, spinners con indicatif, y flujos automáticos para instalación de dependencias y configuración del entorno.

## Notas de la Versión

Esta versión introduce una nueva forma de manejar rutas y dependencias mediante decoradores personalizados, lo que simplifica la configuración y mantenimiento del código. Recomendamos revisar la documentación actualizada para adaptarse a estos cambios.

### Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

 - Haz un fork del repositorio.
 - Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
 - Realiza tus cambios y haz un commit (git commit -am 'Añade nueva funcionalidad').
 - Sube tu rama (git push origin feature/nueva-funcionalidad).
 - Abre un Pull Request.

### Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Autor
Diego Toro Reyes - GitHub

¡Gracias por usar BullJS CLI! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio de GitHub.

<div align="center">
  <a href="https://dtoro-dev-portfolio.netlify.app/">
    <img src="https://github.com/dtoro-dev/bullcli-site/blob/master/src/assets/dtorodev-large.png?raw=true" />
  </a> 
</div>