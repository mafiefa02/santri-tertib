'use client';

import { type RewardCategory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRewardCategoryAction } from '../_actions/delete-reward-category-action';

export const useDeleteRewardCategory = (props: {
  id: RewardCategory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-reward-category', { id: props.id }],
    mutationFn: () => deleteRewardCategoryAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully deleted a reward category!');
      void queryClient.invalidateQueries({
        queryKey: ['reward-categories'],
      });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
