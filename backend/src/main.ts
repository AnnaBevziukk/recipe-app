import * as crypto from 'crypto';
// @ts-ignore
global.crypto = crypto as any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
