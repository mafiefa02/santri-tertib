'use client';

import {
  ActionIcon,
  Button,
  Modal,
  Select,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { $Enums } from '@prisma/client';
import { IconClipboard, IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import type { z } from 'zod';

import { getAccountTypeSelectOptions } from '@/utils/get-account-type-select-options';
import { randomString } from '@/utils/random-string';

import { useCreateAccount } from '../_hooks/use-create-account';
import { createAccountSchema } from '../_schemas/create-account-schema';

export const AddAccountModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} title="Create a new account" onClose={close}>
        <ModalContent close={close} />
      </Modal>
      <ActionIcon
        aria-label="Add account button"
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
  const { mutate, isPending } = useCreateAccount(close);
  const form = useForm<z.infer<typeof createAccountSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      displayName: '',
      password: randomString(8),
      type: $Enums.Role.STAFF,
      username: '',
    },
    validate: zodResolver(createAccountSchema),
    validateInputOnBlur: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.onSubmit((values) => mutate(values))}
    >
      <TextInput
        key={form.key('username')}
        withAsterisk
        label="Username"
        placeholder="Enter account's username"
        {...form.getInputProps('username')}
      />

      <TextInput
        key={form.key('password')}
        readOnly
        withAsterisk
        description="This password is auto-generated and can't be changed."
        label="Password"
        rightSection={
          <Tooltip
            className="hover:cursor-pointer"
            label="Click to copy this password"
          >
            <IconClipboard
              size={16}
              onClick={() => {
                void navigator.clipboard.writeText(form.getValues().password);
                toast.info('Password copied to clipboard!');
              }}
            />
          </Tooltip>
        }
        {...form.getInputProps('password')}
      />

      <TextInput
        key={form.key('displayName')}
        withAsterisk
        label="Display name"
        placeholder="Enter account's display name"
        {...form.getInputProps('displayName')}
      />

      <Select
        key={form.key('type')}
        withAsterisk
        data={getAccountTypeSelectOptions()}
        label="Account's role"
        placeholder="Select account's role"
        {...form.getInputProps('type')}
      />

      <div className="mt-4 flex w-full items-center gap-3">
        <Button
          fullWidth
          disabled={isPending}
          type="button"
          variant="default"
          onClick={close}
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
