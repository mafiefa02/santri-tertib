'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import type { RewardCategory } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { useEditRewardCategory } from '../_hooks/use-edit-reward-category';
import { editRewardCategorySchema } from '../_schemas/edit-reward-category-schema';

const MODAL_ID = 'edit-reward-category';

export const EditRewardCategoryModal = ({
  reward,
}: {
  reward: RewardCategory;
}) => {
  return (
    <Tooltip label={`Edit ${reward.name} reward category`}>
      <ActionIcon
        aria-label="Edit reward category button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit reward category`,
            children: <ModalContent reward={reward} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ reward }: { reward: RewardCategory }) => {
  const { mutate, isPending } = useEditRewardCategory({
    id: reward.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editRewardCategorySchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: reward.name,
    },
    validate: zodResolver(editRewardCategorySchema),
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
          onClick={() => closeModal(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button fullWidth loading={isPending} type="submit">
          Edit
        </Button>
      </div>
    </form>
  );
};
