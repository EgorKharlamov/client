import { UserRoles } from "~/api/constants";

export interface UserEntity {
  id: number;
  email: string;
  phone: string;
  name: string;
  role: UserRoles;
}
