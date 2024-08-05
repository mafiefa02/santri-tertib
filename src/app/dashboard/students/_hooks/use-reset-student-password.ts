'use client';

import type { Student } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resetStudentPasswordAction } from '../_actions/reset-student-password-action';

export const useResetStudentPassword = (props: {
  id: Student['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['reset-student-password', { id: props.id }],
    mutationFn: () => resetStudentPasswordAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: (newPassword) => {
      void navigator.clipboard.writeText(newPassword);
      toast.success(`Password reset successful!`);
      setTimeout(() => toast.info(`New password copied to clipboard.`), 1000); // 1-second delay
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
