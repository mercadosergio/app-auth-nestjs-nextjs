import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/entities/role.entity';
import { hash } from 'bcryptjs';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;
  let rolesService: RolesService;

  const roleRepositoryMock = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const userRepositoryMock = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockUsers = [
    {
      id: 1,
      name: "Sam",
      email: "will23@gmail.com",
      username: "trever_predovic22",
      biography: "coach, entrepreneur, geek",
      phoneNumber: "501-614-781",
      gender: "F",
      createdAt: "2023-09-08T21:10:00.034Z",
      updatedAt: "2023-09-08T21:10:00.034Z",
      role: {
        id: 2,
        name: "Viewer"
      }
    }
  ];

  const mockUser = mockUsers[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepositoryMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should return all users', async () => {
    userRepository.find = jest.fn().mockResolvedValue(mockUsers);
    const result = await usersService.findAll();
    expect(userRepository.find).toHaveBeenCalledWith({ relations: ['role'] });
    expect(result).toEqual(mockUsers);
  });

  it('should return a user by ID', async () => {
    userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

    const userId = 1;
    const result = await usersService.findOne(userId);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      relations: ['role'],
    });
    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundException for non-existing user', async () => {
    userRepository.findOne = jest.fn().mockResolvedValue(null);

    const userId = 999;
    let error: Error | null = null;

    try {
      await usersService.findOne(userId);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(NotFoundException);
  });
});
