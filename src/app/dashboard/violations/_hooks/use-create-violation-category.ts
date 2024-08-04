'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createViolationCategoryAction } from '../_actions/create-violation-category-action';
import { type createViolationCategorySchema } from '../_schemas/create-violation-category-schema';

export const useCreateViolationCategory = (props?: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-violation-category'],
    mutationFn: (value: z.infer<typeof createViolationCategorySchema>) =>
      createViolationCategoryAction(value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new violation!');
      void queryClient.invalidateQueries({
        queryKey: ['violation-categories'],
      });
      props ? props.onSuccess() : null;
    },
  });
};
