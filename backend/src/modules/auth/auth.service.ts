import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { RegisterDto } from './dto/register-auth-dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords dont match');
    }
    const newUser = new User();
    newUser.name = registerDto.name;
    newUser.username = registerDto.username;
    newUser.email = registerDto.email;
    const { password } = registerDto;
    const hashedPassword = await hash(password, 10);
    newUser.password = hashedPassword;
    newUser.phoneNumber = registerDto.phoneNumber;
    newUser.biography = registerDto.biography;
    newUser.gender = registerDto.gender;
    const save = await this.userRepository.save(newUser);
    delete newUser.password;
    return save;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) throw new NotFoundException('User dont exists');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Passwords dont match');

    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
