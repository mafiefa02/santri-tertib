import { z } from 'zod';

export const createClassSchema = z.object({
  name: z
    .string({ required_error: 'Please provide a name!' })
    .min(1, { message: 'Please provide a name' }),
});
