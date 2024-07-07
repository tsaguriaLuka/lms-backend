import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserAuthorization,
  UserAuthorizationSchema,
} from '../schemes/Authorization.schema';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { User, UserSchema } from '../schemes/User.schema';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    MongooseModule.forFeature([
      {
        name: UserAuthorization.name,
        schema: UserAuthorizationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [AuthorizationService, JwtStrategy],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
