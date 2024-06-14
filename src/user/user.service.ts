import { BooleanMessage } from './interface/boolean-message.interface';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SignInUserDto } from './dto/sign-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from './interface/login-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }
  async create(createUserDto: CreateUserDto): Promise<BooleanMessage> {
    const isEmailExist = await this.userModel.findOne({ email: createUserDto.email.toLowerCase() })
    if (isEmailExist) {
      throw new BadRequestException('Email already exist.')
    }
    const userId = uuidv4();
    const newUser = new User()
    newUser.id = userId;
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email.toLowerCase();
    newUser.password = await bcrypt.hash(createUserDto.password, 10)

    await this.userModel.create(newUser)
    return { success: true, message: "User created successfully" }
  }

  async signIn(signInDto: SignInUserDto): Promise<LoginUser> {
    const { email, password } = signInDto;
    console.log(email, password)
    const user = await (await this.userModel.findOne({ email: email.toLowerCase() }).select(['+password', '+email']));
    console.log(user)
    if (!user) {
      throw new BadRequestException('User Not Found')
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    console.log(password, user.password)
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials.')
    }
    const token = this.jwtService.sign({ id: user._id, email: user.email })
    return { success: true, message: " User signIn successfully.", token }
  }

  async findOne(userId: string) {
    const user = await this.userModel.findOne({ userId })
    if (!user) {
      throw new NotFoundException('User Not Found')
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
