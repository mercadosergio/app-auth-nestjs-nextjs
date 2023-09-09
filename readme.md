# App de autenticación, roles y gestión de usuarios

Este software está desarrollado con los frameworks NestJs(backend) y NextJs(frontend) permite gestionar usuarios, autenticación con JWT, roles y permisos

## Instalación

- Clone este repositorio con:

```
git clone https://github.com/mercadosergio/app-auth-nestjs-nextjs.git
```

### Backend

1. Para levantar el entorno del backend, deberá abrir la terminal con la dirección del repositorio clonado y ubicarse en el entorno backend con `cd backend`.
2. Instalar las dependencias de Nodejs con `npm install`.
3. Esta API REST alberga una conexión con el sistema gestor alamacenamiento de Postgres, por lo que deberá tener un servidor que lo ejecute, por ende, cree una base de datos de postgres con las credenciales asignadas.
4. Para proteger datos comprometedores de configuración cree un archivo a la raíz del backend llamado `.env`. En él coloque las variables de entorno, de acuerdo a la configuración de su servidor de base de datos y demás factores importantes necesarios para la aplicación. En el `.env.example` estarán las variables que debe asignar.
5. A todo esto, se utilizó el ORM TypeORM como forma de gestionar la base de datos. Ubiquese en la terminal del backend y ejecute `npm run migrations:run` para migrar las tablas a la base de datos; posteriormente ejecute `npm run seed:run` para insertar los seeders o datos semilla en las tablas, todo esto para tener una mejor experiencia en cuanto al flujo de contacto con el software.
6. Estando en la dirección backend en la terminal, ejecute `npm run start:dev` para levantar el entorno de desarrollo o `npm run start` para levantar el entorno de producción.

> NOTA: Algunas peer dependencies y librerías están sujetas a versiones estables, por lo que se recomienda NO ejecutar `npm update` en la terminal

### Frontend

1. Mientras está en ejecución el backend, abrir otra terminal, ubicarse en la ruta del repositorio y ejecutar `cd frontend`.
2. Crear un archivo llamado `.env.local` en la raíz del frontend, y asignarle tal cuál las variables de entorno pertinentes ejemplificadas en el archivo `.env.local.example`
3. Ejecutar la aplicación con `npm run dev` a modo de desarrollo o `npm run start` a modo de producción.

## Credenciales

- Puesto que la forma de registrarse es de usuario común, para iniciar sesión con un admin, solo hay uno disponible, y sus credenciales son las siguientes:
  > email: sergio@smartinfo.com
  > password: 1234567890
