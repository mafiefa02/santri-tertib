'use client';

import { Button, MenuItem, NumberInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, modals } from '@mantine/modals';
import { IconTrophy } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { RewardCategoriesSelect } from '@/components/reward-categories-select';

import { useCreateReward } from '../_hooks/use-create-reward';
import { createRewardsSchema } from '../_schemas/create-rewards-schema';

const MODAL_ID = 'create-new-reward';

export const AddRewardsModal = () => {
  return (
    <MenuItem
      leftSection={<IconTrophy size={16} />}
      onClick={() =>
        modals.open({
          modalId: MODAL_ID,
          title: 'Create new reward',
          children: <ModalContent />,
        })
      }
    >
      Create new reward
    </MenuItem>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateReward({
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createRewardsSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      points: 0,
      categoryId: '0',
    },
    validate: zodResolver(createRewardsSchema),
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
        placeholder="Enter reward's name"
        {...form.getInputProps('name')}
      />
      <RewardCategoriesSelect
        key={form.key('categoryId')}
        withAsterisk
        label="Category"
        placeholder="Select reward's category"
        {...form.getInputProps('categoryId')}
      />
      <NumberInput
        key={form.key('points')}
        withAsterisk
        label="Points"
        min={0}
        placeholder="Enter reward's point"
        {...form.getInputProps('points')}
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
