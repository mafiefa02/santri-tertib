'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { modals, openModal } from '@mantine/modals';
import { $Enums } from '@prisma/client';
import { IconClipboard, IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import type { z } from 'zod';

import { AccountTypeSelect } from '@/components/account-type-select';
import { randomString } from '@/utils/random-string';

import { useCreateAccount } from '../_hooks/use-create-account';
import { createAccountSchema } from '../_schemas/create-account-schema';

const MODAL_ID = 'create-new-account';

export const AddAccountModal = () => {
  return (
    <ActionIcon
      aria-label="Add account button"
      className="bg-mtn-primary-filled text-white"
      size="input-sm"
      variant="filled"
      onClick={() =>
        openModal({
          modalId: MODAL_ID,
          title: 'Create a new account',
          children: <ModalContent />,
        })
      }
    >
      <IconPlus size={16} />
    </ActionIcon>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateAccount({
    onSuccess: () => modals.close(MODAL_ID),
  });

  const form = useForm<z.infer<typeof createAccountSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      displayName: '',
      password: randomString(8),
      type: $Enums.Role.STAFF,
      username: '',
    },
    validate: zodResolver(createAccountSchema),
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

      <AccountTypeSelect
        key={form.key('type')}
        withAsterisk
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
