'use client';

import { ActionIcon, Button, Modal, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { User } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteAccount } from '../_hooks/use-delete-account';

export const DeleteAccountModal = ({
  userId,
  userDisplayName,
}: {
  userId: User['id'];
  userDisplayName: User['displayName'];
}) => {
  const [opened, { open, close }] = useDisclosure();
  const { mutate, isPending } = useDeleteAccount(userId, close);

  return (
    <>
      <Modal opened={opened} title="Delete account" onClose={close}>
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to delete the account for the user{' '}
            <span className="font-bold">{userDisplayName}</span>?
          </p>
          <div className="flex w-full items-center gap-2">
            <Button
              fullWidth
              disabled={isPending}
              variant="default"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              className="bg-red-600 hover:bg-red-500"
              loading={isPending}
              onClick={() => mutate()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Tooltip label="Delete account">
        <ActionIcon onClick={open}>
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  );
};
