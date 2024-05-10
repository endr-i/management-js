import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(inactive = false) {
    const filter = inactive ? {} : { isActive: true };

    return await this.userRepository.find({ where: filter });
  }

  async get(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: Partial<User>) {
    return await this.userRepository.update({ id }, user);
  }

  async delete(id: string) {
    return await this.userRepository.update({ id }, { isActive: false });
  }
}
