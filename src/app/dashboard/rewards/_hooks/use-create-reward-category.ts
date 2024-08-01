'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createRewardCategoryAction } from '../_actions/create-reward-category-action';
import { type createRewardCategorySchema } from '../_schemas/create-reward-category-schema';

export const useCreateRewardCategory = (closeModal: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-reward-category'],
    mutationFn: (value: z.infer<typeof createRewardCategorySchema>) =>
      createRewardCategoryAction(value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new reward!');
      closeModal();
      void queryClient.invalidateQueries({ queryKey: ['reward-categories'] });
    },
  });
};
