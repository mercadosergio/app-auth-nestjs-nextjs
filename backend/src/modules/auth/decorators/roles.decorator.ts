import { SetMetadata } from "@nestjs/common";
import { AppRole } from "../enums/role.enum";

export const Roles = (rolename: AppRole) => SetMetadata('roles', rolename);