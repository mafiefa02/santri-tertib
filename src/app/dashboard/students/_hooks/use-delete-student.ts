'use client';

import type { Student } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteStudentAction } from '../_actions/delete-student-action';

export const useDeleteStudent = (props: {
  id: Student['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['delete-student', { id: props.id }],
    mutationFn: () => deleteStudentAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success(`Student deleted successfully!`);
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
