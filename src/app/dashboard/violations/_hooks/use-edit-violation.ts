'use client';

import { type Violation } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editViolationAction } from '../_actions/edit-violation-action';
import { type editViolationSchema } from '../_schemas/edit-violation-schema';

export const useEditViolation = (props: {
  id: Violation['id'];
  onSuccess?: () => void;
}) => {
  return useMutation({
    mutationKey: ['edit-violation', { id: props.id }],
    mutationFn: (data: z.infer<typeof editViolationSchema>) =>
      editViolationAction(props.id, data),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a violation!');
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
