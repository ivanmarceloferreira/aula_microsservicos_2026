import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  createUser(@Body() user: User) {
      return this.usersService.create(user.firstName!, user.lastName!, user.email!);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return await this.usersService.findOne(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() attrs: Partial<User>) {
      return this.usersService.update(id, attrs);
  }

}
