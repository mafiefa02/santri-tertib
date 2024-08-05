'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import type { Violation } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteViolation } from '../_hooks/use-delete-violation';

const MODAL_ID = 'delete-violation';

export const DeleteViolationModal = ({
  id,
  violationName,
}: {
  id: Violation['id'];
  violationName: Violation['name'];
}) => {
  return (
    <Tooltip label={`Delete ${violationName} violation`}>
      <ActionIcon
        aria-label="Delete violation button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete violation',
            children: <ModalContent id={id} violationName={violationName} />,
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
  violationName,
}: {
  id: Violation['id'];
  violationName: Violation['name'];
}) => {
  const { mutate, isPending } = useDeleteViolation({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete violation with name{' '}
        <span className="font-bold">{violationName}</span>
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
