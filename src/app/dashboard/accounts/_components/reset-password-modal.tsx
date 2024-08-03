'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { modals, openModal } from '@mantine/modals';
import type { User } from '@prisma/client';
import { IconKey } from '@tabler/icons-react';

import { useResetPassword } from '../_hooks/use-reset-password';

const MODAL_ID = 'reset-password';

export const ResetPasswordModal = ({
  userId,
  userDisplayName,
}: {
  userId: User['id'];
  userDisplayName: User['displayName'];
}) => {
  return (
    <Tooltip label="Reset password">
      <ActionIcon
        aria-label="Reset password button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Reset password',
            children: (
              // We can't render modal content here directly because the isPending state somehow doesn't change
              <ModalContent userDisplayName={userDisplayName} userId={userId} />
            ),
          })
        }
      >
        <IconKey size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({
  userId,
  userDisplayName,
}: {
  userId: User['id'];
  userDisplayName: User['displayName'];
}) => {
  const { mutate, isPending } = useResetPassword({
    id: userId,
    onSuccess: () => modals.close(MODAL_ID),
  });

  return (
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
          onClick={() => modals.close(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button fullWidth loading={isPending} onClick={() => mutate()}>
          Reset
        </Button>
      </div>
    </div>
  );
};
