import { z } from 'zod';

export const addRewardsSchema = z.object({
  name: z
    .string({ required_error: 'Please provide a reward name!' })
    .min(1, { message: 'Please provide a reward name' }),
  points: z
    .number({ message: 'Points has to be a number!' })
    .min(0, { message: "Points can't be lower than zero." }),
  categoryId: z.number({ message: 'Please provide a valid category!' }),
});
