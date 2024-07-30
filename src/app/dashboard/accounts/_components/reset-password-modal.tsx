'use client';

import { ActionIcon, Button, Modal, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { User } from '@prisma/client';
import { IconKey } from '@tabler/icons-react';

import { useResetPassword } from '../_hooks/use-reset-password';

export const ResetPasswordModal = ({
  userId,
  userDisplayName,
}: {
  userId: User['id'];
  userDisplayName: User['displayName'];
}) => {
  const [opened, { open, close }] = useDisclosure();
  const { mutate, isPending } = useResetPassword(userId, close);

  return (
    <>
      <Modal opened={opened} title="Reset password" onClose={close}>
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to reset password for the user{' '}
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
            <Button fullWidth loading={isPending} onClick={() => mutate()}>
              Reset
            </Button>
          </div>
        </div>
      </Modal>
      <Tooltip label="Reset password">
        <ActionIcon aria-label="Reset password button" onClick={open}>
          <IconKey size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  );
};
