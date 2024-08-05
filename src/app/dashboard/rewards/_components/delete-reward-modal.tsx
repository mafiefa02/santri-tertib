'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import type { Reward } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteReward } from '../_hooks/use-delete-reward';

const MODAL_ID = 'delete-reward';

export const DeleteRewardModal = ({
  id,
  rewardName,
}: {
  id: Reward['id'];
  rewardName: Reward['name'];
}) => {
  return (
    <Tooltip label={`Delete ${rewardName} violation`}>
      <ActionIcon
        aria-label="Delete violation button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete violation',
            children: <ModalContent id={id} rewardName={rewardName} />,
          })
        }
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({
  id,
  rewardName,
}: {
  id: Reward['id'];
  rewardName: Reward['name'];
}) => {
  const { mutate, isPending } = useDeleteReward({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete a reward with name{' '}
        <span className="font-bold">{rewardName}</span>
      </p>
      <div className="flex w-full items-center gap-2">
        <Button
          fullWidth
          disabled={isPending}
          variant="default"
          onClick={() => closeModal(MODAL_ID)}
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
