import { z } from 'zod';

export const editStudentSchema = z.object({
  fullName: z
    .string({ required_error: "Please provide student's name!" })
    .min(1, { message: "Please provide student's name!" }),
  identityNumber: z
    .string({ required_error: "Please provide student's identifier!" })
    .min(1, { message: "Please provide student's identifier!" }),
  address: z
    .string()
    .min(5, { message: 'Address needs to be atleast 5 characters long!' })
    .optional(),
  classId: z.string().refine((value) => {
    const id = parseInt(value);
    return !isNaN(parseInt(value)) && id >= 0;
  }),
  dormitoryId: z.string().refine((value) => {
    const id = parseInt(value);
    return !isNaN(parseInt(value)) && id >= 0;
  }),
});
