'use client';

import type { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAccountAction } from '../_actions/delete-account-action';

export const useDeleteAccount = (id: User['id'], close: () => void) => {
  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: () => deleteAccountAction(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Account deleted successfully!`);
      close();
    },
  });
};
