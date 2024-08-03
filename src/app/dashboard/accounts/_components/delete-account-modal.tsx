'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { modals, openModal } from '@mantine/modals';
import type { User } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteAccount } from '../_hooks/use-delete-account';

const MODAL_ID = 'delete-account';

export const DeleteAccountModal = ({
  userId,
  userDisplayName,
}: {
  userId: User['id'];
  userDisplayName: User['displayName'];
}) => {
  return (
    <Tooltip label="Delete account">
      <ActionIcon
        aria-label="Delete account button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete account',
            children: (
              // We can't render modal content here directly because the isPending state somehow doesn't change
              <ModalContent userDisplayName={userDisplayName} userId={userId} />
            ),
          })
        }
      >
        <IconTrash size={16} />
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
  const { mutate, isPending } = useDeleteAccount({
    id: userId,
    onSuccess: () => modals.close(MODAL_ID),
  });

  return (
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
          onClick={() => modals.close(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          color="red"
          loading={isPending}
          onClick={() => mutate()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
