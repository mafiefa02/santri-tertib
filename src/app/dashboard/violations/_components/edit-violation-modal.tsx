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
import type { Violation } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import type { z } from 'zod';

import { ViolationCategoriesSelect } from '@/components/select/violation-categories-select';
import { ViolationTypeSelect } from '@/components/select/violation-type-select';

import { useEditViolation } from '../_hooks/use-edit-violation';
import { editViolationSchema } from '../_schemas/edit-violation-schema';

const MODAL_ID = 'edit-violation';

export const EditViolationModal = ({ violation }: { violation: Violation }) => {
  return (
    <Tooltip label={`Edit ${violation.name} violation`}>
      <ActionIcon
        aria-label="Edit violation button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit violation`,
            children: <ModalContent violation={violation} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ violation }: { violation: Violation }) => {
  const { mutate, isPending } = useEditViolation({
    id: violation.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editViolationSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: violation.name,
      categoryId: violation.categoryId ? violation.categoryId.toString() : '',
      points: violation.points,
      type: violation.type,
    },
    validate: zodResolver(editViolationSchema),
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
      <ViolationTypeSelect
        key={form.key('type')}
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
          Edit
        </Button>
      </div>
    </form>
  );
};
