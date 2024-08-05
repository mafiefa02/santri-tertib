import { z } from 'zod';

export const editRewardCategorySchema = z.object({
  name: z
    .string({ required_error: 'Please provide a category name!' })
    .min(1, { message: 'Please provide a category name' }),
});
