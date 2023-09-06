import { environment } from 'src/config/environment.keys';

import { ConfigModule } from '@nestjs/config/dist/config.module';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import InitSeeder from './seeds/init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  type: 'postgres',
  host: environment.dbHost,
  port: parseInt(environment.dbPort, 10),
  database: environment.dbName,
  username: environment.dbUsername,
  password: environment.dbPassword,
  entities: ['src/**/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: [InitSeeder],
};

export const dataSource = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
