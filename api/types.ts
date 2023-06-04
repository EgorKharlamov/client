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
  createdByUserId: number;
  name: string;
  serverAddr: string;
  forUserEmail: string;
  status: VpnStatus;
}
