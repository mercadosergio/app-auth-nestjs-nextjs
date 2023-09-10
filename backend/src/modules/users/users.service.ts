import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findOne(createUserDto.roleId);
    if (!role) throw new NotFoundException('Role doesnt exist');

    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    const { password } = createUserDto;
    const hashedPassword = await hash(password, 10);
    newUser.password = hashedPassword;
    newUser.phoneNumber = createUserDto.phoneNumber;
    newUser.biography = createUserDto.biography;
    newUser.gender = createUserDto.gender;
    newUser.role = role;

    const save = await this.userRepository.save(newUser);
    delete newUser.password;
    return save;
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['role']
    });
    return users;
  }

  async findNonAdminUsers() {
    const allUsers = await this.userRepository.find({
      relations: ['role']
    });
    const users = allUsers.filter((user) => user.role.id === 2);
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);

    const userUpdated = await this.userRepository.save(user);
    return userUpdated;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user.id;
  }
}
