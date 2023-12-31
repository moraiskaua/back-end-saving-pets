import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { WrapperDataInterceptor } from './shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConflictErrorFilter } from './shared/infrastructure/exception-filter/conflict-error/conflict-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(new ConflictErrorFilter());
}
