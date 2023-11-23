import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );
  applyGlobalConfig(app);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Application is running on: ${app.getUrl()}`);
  });
}

bootstrap();
