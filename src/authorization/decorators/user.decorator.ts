import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/CreateUser.dto';

export const CurrentUser = createParamDecorator(
  (data: keyof CreateUserDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
