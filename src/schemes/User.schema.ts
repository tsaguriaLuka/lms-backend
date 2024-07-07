import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop({ unique: true, required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false })
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
