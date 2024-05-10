import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../../../service/user/user.service';
import { CreateUserDto } from '../../../../service/user/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Post()
  postUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Post(':id')
  updateUser(@Param('id') id: string, @Body() user: Partial<CreateUserDto>) {
    return this.userService.update(id, user);
  }
}
