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
- **Integración con Prisma**: Manejo avanzado de bases de datos con Prisma, ofreciendo una API limpia y segura para interactuar con SQLite u otros sistemas de bases de datos.
- **Documentación API con Swagger**: Generación automática de documentación API utilizando Swagger.
- **CLI Dedicada**: Bullwork se gestiona a través de la CLI de BullJS, que facilita la creación de proyectos y la administración de módulos.

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

 - Genera un nuevo módulo en el proyecto.
```bash
bull run generate:module <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
bull run remove:module <module-name>
```

### Requisitos

- Node.js >= 20.15.1 (LTS)
- `pnpm` instalado globalmente.

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