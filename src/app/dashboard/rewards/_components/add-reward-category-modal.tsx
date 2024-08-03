'use client';

import { Button, MenuItem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, modals } from '@mantine/modals';
import { IconCategory2 } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { useCreateRewardCategory } from '../_hooks/use-create-reward-category';
import { createRewardCategorySchema } from '../_schemas/create-reward-category-schema';

const MODAL_ID = 'create-new-reward-category';

export const AddRewardCategoryModal = () => {
  return (
    <MenuItem
      leftSection={<IconCategory2 size={16} />}
      onClick={() =>
        modals.open({
          modalId: MODAL_ID,
          title: 'Create new reward category',
          children: <ModalContent />,
        })
      }
    >
      Create new category
    </MenuItem>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateRewardCategory({
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createRewardCategorySchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createRewardCategorySchema),
    validateInputOnBlur: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.onSubmit((value) => mutate(value))}
    >
      <TextInput
        key={form.key('name')}
        withAsterisk
        label="Name"
        placeholder="Enter category name"
        {...form.getInputProps('name')}
      />
      <div className="flex items-center gap-2 w-full">
        <Button
          fullWidth
          disabled={isPending}
          variant="default"
          onClick={() => modals.close(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button fullWidth loading={isPending} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};
