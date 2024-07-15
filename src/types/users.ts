import type { Role } from '@prisma/client';

export interface UserSession {
  id: string;
  type: Role;
  username: string;
  displayName?: string;
  avatar?: string;
}
