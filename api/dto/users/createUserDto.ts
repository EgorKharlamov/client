import { UserRoles } from "~/api/constants";
import { UserEntity } from "~/api/types";

export interface CreateUserRequestDto {
  email: string;
  phone: string;
  pass: string;
  passRepeat: string;
  name: string;
  role?: UserRoles;
}

export interface CreateUserResponseDto extends UserEntity {}
