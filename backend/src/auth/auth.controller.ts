import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.register(body);
    res.cookie('jwt', token.access_token, {
      httpOnly: false,

      secure: process.env.NODE_ENV === 'production', // ставити true в продакшені
      maxAge: 1000 * 60 * 60 * 24, // 1 день
      sameSite: 'lax', // або 'strict', залежно від твоїх потреб
    });
    return { message: 'Registered successfully' };
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(body.email, body.password);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    });
    return { message: 'Logged in successfully' };
  }
}
