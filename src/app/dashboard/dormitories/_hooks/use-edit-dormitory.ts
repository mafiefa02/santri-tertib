'use client';

import { type Dormitory } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type z } from 'zod';

import { editDormitoryAction } from '../_actions/edit-dormitory-action';
import { type editDormitorySchema } from '../_schemas/edit-dormitory-schema';

export const useEditDormitory = (props: {
  id: Dormitory['id'];
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-dormitory', { id: props.id }],
    mutationFn: (value: z.infer<typeof editDormitorySchema>) =>
      editDormitoryAction(props.id, value),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Successfully edited a dormitory!');
      void queryClient.invalidateQueries({ queryKey: ['dormitories'] });
      props.onSuccess ? props.onSuccess() : null;
    },
  });
};
