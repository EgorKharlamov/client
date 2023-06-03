import { UserEntity } from "~/api/types";

export interface GetUserByIdRequestDto {
  id: number;
}

export interface GetUserByIdResponseDto extends UserEntity {}
