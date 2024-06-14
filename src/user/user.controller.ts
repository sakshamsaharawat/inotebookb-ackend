import { BooleanMessage } from './interface/boolean-message.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/sign-user.dto';
import { LoginUser } from './interface/login-user.interface';
import { JwtAuthGuard } from 'src/middleware/jwt-verify-middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<BooleanMessage> {
    return this.userService.create(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() signInUserDto: SignInUserDto): Promise<LoginUser> {
    return this.userService.signIn(signInUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
