import { z } from 'zod';

export const schema = z.object({
  username: z
    .string({ required_error: 'Username is required!' })
    .min(2, { message: 'Should be at least 2 characters long!' }),
  password: z
    .string({ required_error: 'Password is required!' })
    .min(8, { message: 'Should be at least 8 characters long!' }),
});
