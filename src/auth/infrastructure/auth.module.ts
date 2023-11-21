import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      useFactory: async envConfigService => ({
        global: true,
        secret: envConfigService.getJwtSecret(),
        signOptions: {
          expiresIn: envConfigService.getJwtExpirationTime(),
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
