import type { $Enums } from '@prisma/client';

export interface UserSession {
  id: string;
  username: string;
  avatar?: string;
  type: $Enums.Role;
}
