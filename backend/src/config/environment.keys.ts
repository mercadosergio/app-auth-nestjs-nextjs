import { config } from 'dotenv';
config();

export const environment = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
}

export const keyNames = {
    JWT_SECRET: 'JWT_SECRET',
    DB_HOST: 'DB_HOST',
    DB_PORT: 'DB_PORT',
    DB_NAME: 'DB_NAME',
    DB_USERNAME: 'DB_USERNAME',
    DB_PASSWORD: 'DB_PASSWORD',
}
