import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {AdminModule} from "src/admin/admin.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSourceOptions} from "typeorm";
import {YourEntity} from "src/your.entity";

export const dataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  entities: [YourEntity],
  migrations: ['dist/migrations/*.js'],
  metadataTableName: 'typeorm_metadata',
  charset: 'utf8mb4',
  migrationsRun: true,
  logging: ['error', 'warn'],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    TypeOrmModule.forRoot(dataSourceConfig)
  ],
})
export class AppModule {}
