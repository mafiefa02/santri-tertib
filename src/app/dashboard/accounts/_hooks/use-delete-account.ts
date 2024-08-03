'use client';

import type { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAccountAction } from '../_actions/delete-account-action';

export const useDeleteAccount = (props: {
  id: User['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: () => deleteAccountAction(props.id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(`Account deleted successfully!`);
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
