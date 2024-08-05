'use client';

import type { Dormitory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteDormitoryAction } from '../_actions/delete-dormitory-action';

export const useDeleteDormitory = (props: {
  id: Dormitory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-dormitory', { id: props.id }],
    mutationFn: () => deleteDormitoryAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success(`Dormitory deleted successfully!`);
      void queryClient.invalidateQueries({ queryKey: ['dormitories'] });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
