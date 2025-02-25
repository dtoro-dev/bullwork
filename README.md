<div align="center">
  <a href="https://dtoro-dev-portfolio.netlify.app/">
    <img src="https://raw.githubusercontent.com/dtoro-dev/minimalist-portfolio/master/src/assets/logo-2.2.webp" height="90px" width="auto" style="background-color: #f2f1eb; border-radius: 10px; border: 3px solid #e8c538" />
  </a> 


  # Bullwork Framework

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

### Decoradores de Métodos

- **@Get(path: string)**: Define un endpoint HTTP GET en la ruta especificada.
- **@Post(path: string)**: Define un endpoint HTTP POST en la ruta especificada.
- **@Put(path: string)**: Define un endpoint HTTP PUT en la ruta especificada.
- **@Patch(path: string)**: Define un endpoint HTTP PATCH en la ruta especificada.
- **@Delete(path: string)**: Define un endpoint HTTP DELETE en la ruta especificada.

### Decoradores de Parámetros

- **@Body(dtoClass: any)**: Extrae y valida el cuerpo de la solicitud basado en la clase DTO proporcionada.
- **@Param(paramName: string)**: Extrae un parámetro de la ruta.
- **@Query(paramName: string)**: Extrae parámetros de la query string.
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

## Nuevos Decoradores en Bullwork

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

Bullwork se utiliza a través de la [BullJS CLI](https://www.npmjs.com/package/bulljs-cli). Asegúrate de tener instalada la CLI de BullJS en tu máquina:

```bash
npm install -g bulljs-cli pnpm
```

## Creación de un Nuevo Proyecto
Para crear un nuevo proyecto utilizando Bullwork, ejecuta el siguiente comando:

```bash
bull new
```
### O
```bash
bull new project-name
```

### Esto hará lo siguiente:

- Clonará el repositorio [bullwork](https://github.com/dtoro-dev/bullwork).
- Instalará todas las dependencias necesarias utilizando pnpm.
- Configurará el proyecto en una nueva carpeta con el nombre *project-name*.
- Podrás utilizar los comandos del Bulljs-cli para crear y eliminar módulos.

## Uso

### Iniciar el Entorno de Desarrollo

Para levantar el entorno de desarrollo:

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
bull run generate:module <module-name>
bull run g:m <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
bull run remove:module <module-name>
bull run r:m <module-name>
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
bull remove <dependency-name>
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

 - Luego ejecutar la validación, este comando tomara la configuración del archivo `.env.development` por defecto, ademas de utilizar el archivo `schema.prisma`.

```bash
bull run prisma:validate
```

 - Ejecuta comando de generate para que prisma cree los modelos.

```bash
bull run prisma:generate
```

 - Finalizando con la migración, esta solicitara que se ingrese el nombre de la migración.

```bash
bull run prisma:migrate:dev
```

### Requisitos

- Node.js >= 20.15.1 (LTS)
- `pnpm` instalado globalmente.

## Changelog

### Versión 1.0.6
- **Mejora**: Uso de base de datos con prisma, ademas, se agrego documentacion del proceso para el uso de prisma con un ejemplo en sqlite.

### Versión 1.0.5
- **Mejora**: Implementación de mejoras para decoradores de middleware.

### Versión 1.0.4

- **Nuevo**: Implementación del decorador `@DocProperty` para manejar la documentación de propiedades en DTOs de manera automática.
- **Mejora**: Se mejoró el contenedor de dependencias con mejor manejo de errores y soporte para instancias singleton.
- **Nuevo**: Añadido el decorador `@Environment` para manejar configuraciones de entorno desde un archivo centralizado en la carpeta `config`. Acceso a estas variables mediante `global.config`.
- **Nuevo**: Integración de un punto de entrada API (API Entry Point) `/api/v1` como base para todas las rutas documentadas en Swagger.
- **Mejora**: Se añadió un `Swagger Loader` mejorado, que organiza automáticamente la documentación de Swagger y asocia los DTOs de ejemplo con `components/schemas`.
- **Mejora**: La función `resolveDependencies` se ha optimizado para mejorar la resolución de dependencias de manera más eficiente y clara.
- **Mejora**: El decorador `@Module` ha sido actualizado para mejorar la organización de módulos y su integración automática en `app.module.ts`.
- **Mejora**: La documentación de Swagger ahora se genera en formato JSON para mayor compatibilidad y flexibilidad, eliminando errores relacionados con `components/schemas`.

### Versión 1.0.7

- **Comentarios**: Eliminando.
- **Mejora**: Se incorpora .npmignore.
- **Nuevo**: Creación de seeds en prisma
```bash 
bull run seed
```

## Nuevas Funcionalidades

### Decorador `@DocProperty`
El decorador `@DocProperty` permite la creación automática de documentación en Swagger para las propiedades de los DTOs. Esto facilita la generación de documentación más precisa y detallada.

### Mejoras en el Contenedor de Dependencias
El contenedor de dependencias ahora maneja mejor los errores y soporta instancias singleton, lo que mejora la eficiencia y la estabilidad de las inyecciones de dependencias.

### Decorador `@Environment`
El decorador `@Environment` permite la gestión centralizada de variables de entorno en un archivo `environment.config.ts` ubicado en la carpeta `config`. Las variables de entorno se pueden acceder fácilmente mediante `config`.

### API Entry Point `/api/v1` (modificable)
Todas las rutas de la API documentadas en Swagger ahora están centralizadas bajo el punto de entrada `/api/v1`, proporcionando una estructura más limpia y organizada para las rutas.

### Swagger Loader Mejorado
El nuevo `Swagger Loader` organiza y documenta automáticamente las rutas y esquemas de la API en Swagger, asociando los DTOs de ejemplo directamente con `components/schemas`. Esto reduce la necesidad de configuración manual y minimiza errores.

### Configuración de Entornos

Bullwork soporta múltiples entornos (desarrollo, QA, producción) a través de la clase `environment.config.ts`, que centraliza la configuración del entorno. Estas configuraciones se pueden definir en scripts `package.json` correspondientes y se acceden mediante `config`.

## Actualización a la Versión 1.0.7

1. Actualiza tus dependencias:
```bash
npm install bullwork@1.0.7 bulljs-cli@1.0.8
```

2. Revisa las nuevas funcionalidades, como @DocProperty, @Environment, y la organización de Swagger, para adaptarlas a tu proyecto.
3. Configura las variables de entorno en `environment.config.ts` y accede a ellas mediante `config`.

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