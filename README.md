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

### Decoradores de Inyección de Dependencias

- **@Injectable()**: Marca una clase como inyectable y registra su instancia en el contenedor de dependencias.
- **@Inject(token: new () => T)**: Inyecta una dependencia en una propiedad de una clase utilizando el contenedor de dependencias.

### Decoradores de Clases

- **@Controller(basePath: string = '')**: Define una clase como un controlador de rutas, con un `basePath` opcional para agrupar rutas relacionadas.

### Resolución de Dependencias

- **resolveDependencies(constructor: Constructor<T>): T**: Función utilizada internamente para resolver las dependencias inyectadas en los constructores utilizando el contenedor de dependencias.

Estos decoradores y funciones están diseñados para trabajar juntos en armonía, proporcionando una base sólida para la creación de aplicaciones backend robustas y escalables utilizando Bullwork.

## Instalación

Bullwork se utiliza a través de la [BullJS CLI](https://www.npmjs.com/package/bulljs-cli). Asegúrate de tener instalada la CLI de BullJS en tu máquina:

```bash
npm install -g bulljs-cli
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

 - Inicia el entorno de desarrollo.
```bash
bull run dev
```

 - Genera un nuevo módulo en el proyecto.
```bash
bull run generate:module <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
bull run remove:module <module-name>
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

### Requisitos

- Node.js >= 20.15.1 (LTS)
- `pnpm` instalado globalmente.

## Changelog

### Versión 1.0.2
- **Nuevo**: Implementación de decoradores personalizados como `@Body`, `@Param`, etc.
- **Mejora**: Eliminación de archivos de rutas independientes; las rutas ahora son gestionadas automáticamente por los decoradores.
- **Corrección**: Resolución de un problema con la inyección de dependencias en servicios.

## Actualización a la versión 1.0.2

1. Actualiza tus dependencias:
```bash
npm install bullwork@1.0.2 bulljs-cli@1.0.6
```
2. Asegúrate de eliminar cualquier archivo de rutas independiente. Las rutas ahora son manejadas automáticamente por los decoradores en los controladores.
3. Revisa las nuevas funcionalidades en la documentación para aprovechar al máximo las mejoras.

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