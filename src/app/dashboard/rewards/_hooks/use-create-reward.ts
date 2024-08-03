'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { createRewardAction } from '../_actions/create-reward-action';
import { type createRewardsSchema } from '../_schemas/create-rewards-schema';

export const useCreateReward = (props?: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: ['create-reward'],
    mutationFn: (data: z.infer<typeof createRewardsSchema>) =>
      createRewardAction(data),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully created a new reward!');
      props ? props.onSuccess() : null;
    },
  });
};
