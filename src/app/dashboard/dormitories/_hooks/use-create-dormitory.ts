'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createDormitoryAction } from '../_actions/create-dormitory-action';
import { type createDormitorySchema } from '../_schemas/create-dormitory-schema';

export const useCreateDormitory = (props?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-dormitory'],
    mutationFn: (value: z.infer<typeof createDormitorySchema>) =>
      createDormitoryAction(value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new dormitory!');
      void queryClient.invalidateQueries({ queryKey: ['dormitories'] });
      props ? props.onSuccess() : null;
    },
  });
};
