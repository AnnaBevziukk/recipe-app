import * as crypto from 'crypto';
// @ts-ignore
global.crypto = crypto as any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
  });
  const adapterInstance = app.getHttpAdapter().getInstance();
  console.log('HTTP Adapter instance:', adapterInstance.constructor.name);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
