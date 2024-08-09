'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { type ViolationCategory } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { useEditViolationCategory } from '../_hooks/use-edit-violation-category';
import { editViolationCategorySchema } from '../_schemas/edit-violation-category-schema';

const MODAL_ID = 'edit-violation-category';

export const EditViolationCategoryModal = ({
  violation,
}: {
  violation: ViolationCategory;
}) => {
  return (
    <Tooltip label={`Edit ${violation.name} violation category`}>
      <ActionIcon
        aria-label="Edit violation category button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit violation category`,
            children: <ModalContent violation={violation} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ violation }: { violation: ViolationCategory }) => {
  const { mutate, isPending } = useEditViolationCategory({
    id: violation.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editViolationCategorySchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: violation.name,
    },
    validate: zodResolver(editViolationCategorySchema),
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
