import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  Param,
  ValidationPipe,
  HttpException,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: UserCreateDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Query('email') email: string) {
    const users = await this.usersService.getUsers(email);

    if (!users) throw new HttpException('Users not found', 404);

    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() updateUserDto: UserUpdateDto,
    @Param('id') id: string,
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    if (!updatedUser) throw new HttpException('failed to update user', 404);

    return updatedUser;
  }
}
