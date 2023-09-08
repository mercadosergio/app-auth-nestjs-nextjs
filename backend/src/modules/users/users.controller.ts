import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AppRole } from '../auth/enums/role.enum';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const authenticatedUser = req.user;
    if (authenticatedUser.role.id == 1) {
      return this.usersService.findAll();
    } else {
      return this.usersService.findNonAdminUsers();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles(AppRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
