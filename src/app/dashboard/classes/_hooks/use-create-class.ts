'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createClassAction } from '../_actions/create-class-action';
import { type createClassSchema } from '../_schemas/create-class-schema';

export const useCreateClass = (props?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-class'],
    mutationFn: (value: z.infer<typeof createClassSchema>) =>
      createClassAction(value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new class!');
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      props ? props.onSuccess() : null;
    },
  });
};
