'use client';

import type { Class } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteClassAction } from '../_actions/delete-class-action';

export const useDeleteClass = (props: {
  id: Class['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-class', { id: props.id }],
    mutationFn: () => deleteClassAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success(`Class deleted successfully!`);
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
