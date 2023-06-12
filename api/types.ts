import { UserRoles, VpnStatus } from "~/api/constants";

export interface UserEntity {
  id: number;
  email: string;
  phone: string;
  name: string;
  role: UserRoles;
}

export interface ServerEntity {
  id: number;
  name: string;
  addr: string;
  maxUsers: number;
  availableSlots: number;
}

export interface VpnEntity {
  id: number;
  userName: number;
  name: string;
  serverName: string;
  forUserEmail: string;
  status: VpnStatus;
}
