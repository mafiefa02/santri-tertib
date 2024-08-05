'use client';

import type { RewardCategory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editRewardCategoryAction } from '../_actions/edit-reward-category-action';
import { type editRewardCategorySchema } from '../_schemas/edit-reward-category-schema';

export const useEditRewardCategory = (props: {
  id: RewardCategory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-reward-category', { id: props.id }],
    mutationFn: (value: z.infer<typeof editRewardCategorySchema>) =>
      editRewardCategoryAction(props.id, value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a reward category!');
      void queryClient.invalidateQueries({
        queryKey: ['reward-categories'],
      });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
