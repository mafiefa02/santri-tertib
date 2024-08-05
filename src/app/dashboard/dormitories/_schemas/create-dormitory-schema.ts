import { z } from 'zod';

export const createDormitorySchema = z.object({
  name: z
    .string({ required_error: 'Please provide a name!' })
    .min(1, { message: 'Please provide a name' }),
  address: z.string().optional(),
});
