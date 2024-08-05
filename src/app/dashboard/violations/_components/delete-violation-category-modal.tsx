'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { type ViolationCategory } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteViolationCategory } from '../_hooks/use-delete-violation-category';

const MODAL_ID = 'delete-violation-category';

export const DeleteViolationCategoryModal = ({
  id,
  categoryName,
}: {
  id: ViolationCategory['id'];
  categoryName: ViolationCategory['name'];
}) => {
  return (
    <Tooltip label={`Delete ${categoryName} category`}>
      <ActionIcon
        aria-label="Delete violation category button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete violation category',
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
  id: ViolationCategory['id'];
  categoryName: ViolationCategory['name'];
}) => {
  const { mutate, isPending } = useDeleteViolationCategory({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete violation category with name{' '}
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
