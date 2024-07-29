'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { z } from 'zod';

import { createAccountAction } from '../_actions/create-account-action';
import type { createAccountSchema } from '../_schemas/create-account-schema';

export const useCreateAccount = (closeModal: () => void) => {
  return useMutation({
    mutationKey: ['create-account'],
    mutationFn: (value: z.infer<typeof createAccountSchema>) =>
      createAccountAction(value),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Successfully created a new account!');
      closeModal();
    },
  });
};
