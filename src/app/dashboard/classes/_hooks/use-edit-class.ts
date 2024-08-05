'use client';

import type { Class } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editClassAction } from '../_actions/edit-class-action';
import { type editClassSchema } from '../_schemas/edit-class-schema';

export const useEditClass = (props: {
  id: Class['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-class', { id: props.id }],
    mutationFn: (value: z.infer<typeof editClassSchema>) =>
      editClassAction(props.id, value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a class!');
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
