'use client';

import type { Violation } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteViolationAction } from '../_actions/delete-violation-action';

export const useDeleteViolation = (props: {
  id: Violation['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['delete-violation', { id: props.id }],
    mutationFn: () => deleteViolationAction(props.id),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success(`Violation deleted successfully!`);
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
