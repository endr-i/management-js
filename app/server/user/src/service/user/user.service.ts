import { Injectable } from '@nestjs/common';
import { User } from "../../entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUser(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }
}
