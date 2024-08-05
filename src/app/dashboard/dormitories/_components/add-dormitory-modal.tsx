'use client';

import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, modals, openModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import type { z } from 'zod';

import { useCreateDormitory } from '../_hooks/use-create-dormitory';
import { createDormitorySchema } from '../_schemas/create-dormitory-schema';

const MODAL_ID = 'create-new-dormitory';

export const AddDormitoryModal = () => {
  return (
    <Button
      aria-label="Add dormitory button"
      className="shrink-0"
      rightSection={<IconPlus size={16} />}
      variant="filled"
      onClick={() =>
        openModal({
          modalId: MODAL_ID,
          title: 'Create a new dormitory',
          children: <ModalContent />,
        })
      }
    >
      Add
    </Button>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateDormitory({
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createDormitorySchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createDormitorySchema),
    validateInputOnBlur: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.onSubmit((values) => mutate(values))}
    >
      <TextInput
        key={form.key('name')}
        withAsterisk
        label="Name"
        placeholder="Enter dormitory's name"
        {...form.getInputProps('name')}
      />
      <TextInput
        key={form.key('address')}
        label="Address"
        placeholder="Enter dormitory's address"
        {...form.getInputProps('address')}
      />
      <div className="mt-4 flex w-full items-center gap-3">
        <Button
          fullWidth
          disabled={isPending}
          type="button"
          variant="default"
          onClick={() => modals.close(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button fullWidth loading={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
