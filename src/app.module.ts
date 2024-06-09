import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ReportsModule } from './reports/infrastructure/reports.module';
import { SheltersModule } from './shelters/infrastructure/shelters.module';

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    ReportsModule,
    SheltersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
