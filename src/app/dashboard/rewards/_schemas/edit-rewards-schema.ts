import { z } from 'zod';

export const editRewardsSchema = z.object({
  name: z
    .string({ required_error: 'Please provide a reward name!' })
    .min(1, { message: 'Please provide a reward name' }),
  points: z
    .number({ message: 'Points has to be a number!' })
    .min(0, { message: "Points can't be lower than zero." }),
  categoryId: z.string().refine((value) => {
    const id = parseInt(value);
    return !isNaN(parseInt(value)) && id >= 0;
  }),
});
