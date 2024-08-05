'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import type { RewardCategory } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteRewardCategory } from '../_hooks/use-delete-reward-category';

const MODAL_ID = 'delete-reward-category';

export const DeleteRewardCategoryModal = ({
  id,
  categoryName,
}: {
  id: RewardCategory['id'];
  categoryName: RewardCategory['name'];
}) => {
  return (
    <Tooltip label={`Delete ${categoryName} category`}>
      <ActionIcon
        aria-label="Delete reward category button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete reward category',
            children: <ModalContent categoryName={categoryName} id={id} />,
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
  categoryName,
}: {
  id: RewardCategory['id'];
  categoryName: RewardCategory['name'];
}) => {
  const { mutate, isPending } = useDeleteRewardCategory({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete a reward category with name{' '}
        <span className="font-bold">{categoryName}</span>?
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
