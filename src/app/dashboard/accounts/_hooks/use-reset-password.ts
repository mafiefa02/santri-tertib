'use client';

import type { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resetPasswordAction } from '../_actions/reset-password-action';

export const useResetPassword = (id: User['id'], close: () => void) => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: () => resetPasswordAction(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (newPassword) => {
      void navigator.clipboard.writeText(newPassword);
      toast.success(`Password reset successful!`);
      setTimeout(() => toast.info(`New password copied to clipboard.`), 1000); // 1-second delay
      close();
    },
  });
};
