'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { z } from 'zod';

import { login } from '../_actions/login';
import type { schema } from '../_schemas/login-schema';

export const useLogin = (type: 'student' | 'user') => {
  return useMutation({
    mutationKey: [`${type}-login`],
    mutationFn: (values: z.infer<typeof schema>) => login(values, type),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(`We successfully logged you in!`);
    },
  });
};
