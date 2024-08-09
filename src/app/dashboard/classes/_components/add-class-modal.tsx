'use client';

import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { type z } from 'zod';

import { useCreateClass } from '../_hooks/use-create-class';
import { createClassSchema } from '../_schemas/create-class-schema';

const MODAL_ID = 'create-new-class';

export const AddClassModal = () => {
  return (
    <Button
      aria-label="Add class button"
      className="shrink-0"
      rightSection={<IconPlus size={16} />}
      variant="filled"
      onClick={() =>
        openModal({
          modalId: MODAL_ID,
          title: 'Create a new class',
          children: <ModalContent />,
        })
      }
    >
      Add
    </Button>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateClass({
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createClassSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createClassSchema),
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
        placeholder="Enter class name"
        {...form.getInputProps('name')}
      />
      <div className="mt-4 flex w-full items-center gap-3">
        <Button
          fullWidth
          disabled={isPending}
          type="button"
          variant="default"
          onClick={() => closeModal(MODAL_ID)}
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
