'use client';

import { type Reward } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editRewardAction } from '../_actions/edit-reward-action';
import { type editRewardsSchema } from '../_schemas/edit-rewards-schema';

export const useEditReward = (props: {
  id: Reward['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['edit-reward', { id: props.id }],
    mutationFn: (data: z.infer<typeof editRewardsSchema>) =>
      editRewardAction(props.id, data),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a reward!');
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
