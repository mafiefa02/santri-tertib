'use client';

import { type ViolationCategory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteViolationCategoryAction } from '../_actions/delete-violation-category-action';

export const useDeleteViolationCategory = (props: {
  id: ViolationCategory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-violation-category', { id: props.id }],
    mutationFn: () => deleteViolationCategoryAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully deleted a violation category!');
      void queryClient.invalidateQueries({
        queryKey: ['violation-categories'],
      });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
