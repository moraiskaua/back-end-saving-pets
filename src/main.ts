import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';
import cors from '@fastify/cors';
import { EnvConfigService } from './shared/infrastructure/env-config/env-config.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const envConfigService = new EnvConfigService(new ConfigService());
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(cors, {
    origin: ['https://saving-pets.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  applyGlobalConfig(app);

  const port = envConfigService.getAppPort() || 3000;
  await app.listen(port);
}

bootstrap();
