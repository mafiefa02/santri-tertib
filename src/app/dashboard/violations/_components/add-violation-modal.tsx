'use client';

import { Button, MenuItem, NumberInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { IconFlag } from '@tabler/icons-react';
import { type z } from 'zod';

import { ViolationCategoriesSelect } from '@/components/violation-categories-select';
import { ViolationTypeSelect } from '@/components/violation-type-select';

import { useCreateViolation } from '../_hooks/use-create-violation';
import { createViolationSchema } from '../_schemas/create-violation-schema';

const MODAL_ID = 'add-violation-modal';

export const AddViolationModal = () => {
  return (
    <MenuItem
      leftSection={<IconFlag size={16} />}
      onClick={() =>
        openModal({
          modalId: MODAL_ID,
          title: 'Create new violation',
          children: <ModalContent />,
        })
      }
    >
      Create new violation
    </MenuItem>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateViolation({
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createViolationSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createViolationSchema),
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
        searchable
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
      <ViolationTypeSelect
        key={form.key('type')}
        searchable
        withAsterisk
        label="Type"
        placeholder="Select violation's type"
        {...form.getInputProps('type')}
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
          Create
        </Button>
      </div>
    </form>
  );
};
