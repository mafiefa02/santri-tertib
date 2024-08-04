import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const createViolationSchema = z.object({
  name: z
    .string({ required_error: 'Please provide a violation name!' })
    .min(1, { message: 'Please provide a violation name' }),
  type: z.nativeEnum($Enums.ViolationType),
  points: z
    .number({ message: 'Points has to be a number!' })
    .min(0, { message: "Points can't be lower than zero." }),
  categoryId: z.string().refine((value) => {
    const id = parseInt(value);
    return !isNaN(parseInt(value)) && id >= 0;
  }),
});
