'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createViolationAction } from '../_actions/create-violation-action';
import { type createViolationSchema } from '../_schemas/create-violation-schema';

export const useCreateViolation = (props?: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: ['create-violation'],
    mutationFn: (data: z.infer<typeof createViolationSchema>) =>
      createViolationAction(data),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new violation!');
      props ? props.onSuccess() : null;
    },
  });
};
