import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { DatabasePostgresModule } from './database-postgres/database-postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthorizationModule,
    DatabasePostgresModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.typeormConfig.host,
        port: configService.typeormConfig.port,
        database: configService.typeormConfig.database,
        username: configService.typeormConfig.username,
        password: configService.typeormConfig.password,
        synchronize: true,
        entities: [__dirname + '/**/*.entity.ts'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
