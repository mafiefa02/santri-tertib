'use client';

import { type Student } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editStudentAction } from '../_actions/edit-student-action';
import { type editStudentSchema } from '../_schemas/edit-student-schema';

export const useEditStudent = (props: {
  id: Student['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['edit-student', { id: props.id }],
    mutationFn: (value: z.infer<typeof editStudentSchema>) =>
      editStudentAction(props.id, value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a student!');
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
