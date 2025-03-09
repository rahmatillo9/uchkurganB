import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from 'src/validators/login.validator'; 
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    const { username, password } = loginDto;

    const user = await this.usersService.findBynickname(username);
    if (!user) {
      throw new HttpException('Parol yoki username hato', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Parol yoki username hato', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, nickname: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
