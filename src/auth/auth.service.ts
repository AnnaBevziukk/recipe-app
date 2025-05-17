import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: UserRole.USER,
    };
    const user = await this.usersService.create(newUser);
    return this.createToken(user.userId, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.createToken(user.userId, user.role);
  }

  private createToken(userId: number, role: string) {
    const payload = { sub: userId, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
