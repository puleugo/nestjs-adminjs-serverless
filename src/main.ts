import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from "cookie-parser";
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from "adminjs";

async function bootstrap() {
  AdminJS.registerAdapter({Database, Resource });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb' }));
  app.use(cookieParser());
  app.enableShutdownHooks();

  await app.listen('3000');
}

bootstrap();
