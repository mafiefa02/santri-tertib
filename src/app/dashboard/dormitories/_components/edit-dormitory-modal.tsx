'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, modals, openModal } from '@mantine/modals';
import { type Dormitory } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import type { z } from 'zod';

import { useEditDormitory } from '../_hooks/use-edit-dormitory';
import { createDormitorySchema } from '../_schemas/create-dormitory-schema';

const MODAL_ID = 'edit-dormitory';

export const EditDormitoryModal = ({ dormitory }: { dormitory: Dormitory }) => {
  return (
    <Tooltip label={`Edit ${dormitory.name} dormitory`}>
      <ActionIcon
        aria-label="Edit dormitory button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit dormitory`,
            children: <ModalContent dormitory={dormitory} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ dormitory }: { dormitory: Dormitory }) => {
  const { mutate, isPending } = useEditDormitory({
    id: dormitory.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createDormitorySchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: dormitory.name,
      address: dormitory.address ?? undefined,
    },
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
          Edit
        </Button>
      </div>
    </form>
  );
};
