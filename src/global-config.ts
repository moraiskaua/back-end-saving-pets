import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { WrapperDataInterceptor } from './shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor';
import { INestApplication } from '@nestjs/common';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
}
