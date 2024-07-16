import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async createUser(createUserDto: UserCreateDto) {
    return this.userRepository.save(createUserDto);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  getUsers(query: string) {
    return query ? this.getUserByEmail(query) : this.userRepository.find();
  }

  getUserById(id: string) {
    return this.userRepository.find({ where: { id } });
  }

  updateUser(id: string, updateUserDto: UserUpdateDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
