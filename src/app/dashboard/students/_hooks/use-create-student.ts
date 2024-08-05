'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createStudentAction } from '../_actions/create-student-action';
import { type createStudentSchema } from '../_schemas/create-student-schema';

interface SuccessReturn {
  fullName: string;
  username: string;
  password: {
    password: string;
  } | null;
}

export const useCreateStudent = (props?: {
  onSuccess: (data: SuccessReturn) => void;
}) => {
  return useMutation({
    mutationKey: ['create-student'],
    mutationFn: (value: z.infer<typeof createStudentSchema>) =>
      createStudentAction(value),
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success('Successfully added a new student!');
      props ? props.onSuccess(data) : null;
    },
  });
};
