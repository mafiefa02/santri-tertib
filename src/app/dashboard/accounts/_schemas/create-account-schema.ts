import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const createAccountSchema = z.object({
  displayName: z.string().min(1, { message: 'Display name is required!' }),
  username: z
    .string()
    .min(8, { message: 'Username needs to be atleast 8 characters long!' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Only letters, numbers, and underscores are allowed.',
    }),
  password: z
    .string()
    .min(8, { message: 'Password needs to be atleast 8 characters long!' }),
  type: z.enum([$Enums.Role.ADMIN, $Enums.Role.STAFF]),
});
