import { UserEntity } from "~/api/types";
import { UserRoles } from "~/api/constants";

export interface UpdateUserRoleByIdRequestDto {
  id: number;
  role: UserRoles;
}

export interface UpdateUserRoleByIdResponseDto extends UserEntity {}
