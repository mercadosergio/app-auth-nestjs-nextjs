import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { AppRole } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
