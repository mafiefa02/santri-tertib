'use client';

import {
  ActionIcon,
  Button,
  NumberInput,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import type { Reward } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import type { z } from 'zod';

import { ViolationCategoriesSelect } from '@/components/violation-categories-select';

import { useEditReward } from '../_hooks/use-edit-reward';
import { editRewardsSchema } from '../_schemas/edit-rewards-schema';

const MODAL_ID = 'edit-reward';

export const EditRewardModal = ({ reward }: { reward: Reward }) => {
  return (
    <Tooltip label={`Edit ${reward.name} reward`}>
      <ActionIcon
        aria-label="Edit reward button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit reward`,
            children: <ModalContent reward={reward} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ reward }: { reward: Reward }) => {
  const { mutate, isPending } = useEditReward({
    id: reward.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editRewardsSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: reward.name,
      categoryId: reward.categoryId ? reward.categoryId.toString() : '',
      points: reward.points,
    },
    validate: zodResolver(editRewardsSchema),
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
        placeholder="Enter violation's name"
        {...form.getInputProps('name')}
      />
      <ViolationCategoriesSelect
        key={form.key('categoryId')}
        withAsterisk
        label="Category"
        placeholder="Select violation's category"
        {...form.getInputProps('categoryId')}
      />
      <NumberInput
        key={form.key('points')}
        withAsterisk
        label="Points"
        min={0}
        placeholder="Enter violation's point"
        {...form.getInputProps('points')}
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
