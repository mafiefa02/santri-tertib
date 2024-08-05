'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import type { Class } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteClass } from '../_hooks/use-delete-class';

const MODAL_ID = 'delete-class';

export const DeleteClassModal = ({
  id,
  nameOfClass,
}: {
  id: Class['id'];
  nameOfClass: string;
}) => {
  return (
    <Tooltip label="Delete class">
      <ActionIcon
        aria-label="Delete class button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete class',
            children: <ModalContent id={id} nameOfClass={nameOfClass} />,
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
  nameOfClass,
}: {
  id: Class['id'];
  nameOfClass: string;
}) => {
  const { mutate, isPending } = useDeleteClass({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete{' '}
        <span className="font-bold">{nameOfClass}</span> class?
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
