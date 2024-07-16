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
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
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
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('User not found', 404);

    const user = await this.usersService.getUserById(id);

    if (!user) throw new HttpException('User not found', 404);

    return {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      password: user?.password,
      id: user?._id
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('Invalid Id', 400);

    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    if (!updatedUser) throw new HttpException('failed to update user', 404);

    return updatedUser;
  }
}
