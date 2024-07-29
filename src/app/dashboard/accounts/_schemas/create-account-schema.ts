import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const createAccountSchema = z.object({
  displayName: z.string().min(1, { message: 'Display name is required!' }),
  username: z.string().min(1, { message: 'Username is required!' }),
  password: z
    .string()
    .min(8, { message: 'Password needs to be atleast 8 characters long!' }),
  type: z.enum([$Enums.Role.ADMIN, $Enums.Role.STAFF]),
});
