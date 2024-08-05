'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, modals, openModal } from '@mantine/modals';
import type { Class } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import type { z } from 'zod';

import { useEditClass } from '../_hooks/use-edit-class';
import { editClassSchema } from '../_schemas/edit-class-schema';

const MODAL_ID = 'edit-class';

export const EditClassModal = ({ studentClass }: { studentClass: Class }) => {
  return (
    <Tooltip label={`Edit ${studentClass.name} class`}>
      <ActionIcon
        aria-label="Edit class button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit class`,
            children: <ModalContent studentClass={studentClass} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ studentClass }: { studentClass: Class }) => {
  const { mutate, isPending } = useEditClass({
    id: studentClass.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editClassSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: studentClass.name,
    },
    validate: zodResolver(editClassSchema),
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
        placeholder="Enter class's name"
        {...form.getInputProps('name')}
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
