import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserAuthorization {
  @Prop({ required: false })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;
}

export const UserAuthorizationSchema =
  SchemaFactory.createForClass(UserAuthorization);
