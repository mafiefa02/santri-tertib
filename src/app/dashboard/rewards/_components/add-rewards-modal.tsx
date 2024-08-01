'use client';

import { ActionIcon, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { type z } from 'zod';

import { addRewardsSchema } from '../_schemas/add-rewards-schema';

export const AddRewardsModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} title="Create new reward" onClose={close}>
        <ModalContent />
      </Modal>
      <ActionIcon
        aria-label="Create new reward button"
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

const ModalContent = () => {
  const form = useForm<z.infer<typeof addRewardsSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(addRewardsSchema),
    validateInputOnBlur: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        key={form.key('name')}
        withAsterisk
        label="Name"
        placeholder="Enter reward's name"
        {...form.getInputProps('name')}
      />
      <NumberInput
        key={form.key('points')}
        withAsterisk
        label="Points"
        min={0}
        placeholder="Enter reward's point"
        {...form.getInputProps('points')}
      />
    </form>
  );
};
