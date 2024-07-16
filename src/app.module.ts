import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { DatabasePostgresModule } from './database-postgres/database-postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthorizationModule,
    DatabasePostgresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
