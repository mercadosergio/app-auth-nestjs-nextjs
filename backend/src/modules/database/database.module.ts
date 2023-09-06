import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { keyNames } from 'src/config/environment.keys';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get<string>(keyNames.DB_HOST),
                    port: parseInt(configService.get<string>(keyNames.DB_PORT), 10),
                    username: configService.get<string>(keyNames.DB_USERNAME),
                    password: configService.get<string>(keyNames.DB_PASSWORD),
                    database: configService.get<string>(keyNames.DB_NAME),
                    entities: ['dist/**/**/*.entity{.js,.ts}'],
                    migrations: ['dist/database/migrations/*{.js,.ts}'],
                    synchronize: false,
                    autoLoadEntities: false,
                    logging: true,
                    logger: 'file',
                    retryDelay: 3000,
                    retryAttempts: 10,
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [
        TypeOrmModule
    ]
})
export class DatabaseModule { }
