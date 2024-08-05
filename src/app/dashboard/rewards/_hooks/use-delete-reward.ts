'use client';

import type { Reward } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRewardAction } from '../_actions/delete-reward-action';

export const useDeleteReward = (props: {
  id: Reward['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['delete-reward', { id: props.id }],
    mutationFn: () => deleteRewardAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success(`Reward deleted successfully!`);
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
