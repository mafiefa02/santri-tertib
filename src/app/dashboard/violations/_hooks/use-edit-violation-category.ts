'use client';

import { type ViolationCategory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editViolationCategoryAction } from '../_actions/edit-violation-category-action';
import { type editViolationCategorySchema } from '../_schemas/edit-violation-category-schema';

export const useEditViolationCategory = (props: {
  id: ViolationCategory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-violation-category', { id: props.id }],
    mutationFn: (value: z.infer<typeof editViolationCategorySchema>) =>
      editViolationCategoryAction(props.id, value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a violation category!');
      void queryClient.invalidateQueries({
        queryKey: ['violation-categories'],
      });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
