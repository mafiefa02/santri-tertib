'use client';

import { ActionIcon, Button, Modal, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { useCreateRewardCategory } from '../_hooks/use-create-reward-category';
import { createRewardCategorySchema } from '../_schemas/create-reward-category-schema';

export const AddRewardCategoryModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} title="Create new reward category" onClose={close}>
        <ModalContent close={close} />
      </Modal>
      <ActionIcon
        aria-label="Create new reward category button"
        className="bg-mtn-primary-filled text-white"
        size="input-sm"
        variant="filled"
        onClick={open}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </>
  );
};

const ModalContent = ({ close }: { close: () => void }) => {
  const { mutate, isPending } = useCreateRewardCategory(close);
  const form = useForm<z.infer<typeof createRewardCategorySchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createRewardCategorySchema),
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
        placeholder="Enter category name"
        {...form.getInputProps('name')}
      />
      <div className="flex items-center gap-2 w-full">
        <Button
          fullWidth
          disabled={isPending}
          variant="default"
          onClick={close}
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
