import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from "../../../../service/user/user.service";
import { CreateUserDto } from "../../../../service/user/user.dto";

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  postUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
