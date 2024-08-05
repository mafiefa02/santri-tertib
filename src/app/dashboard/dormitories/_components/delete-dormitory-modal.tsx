'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { type Dormitory } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteDormitory } from '../_hooks/use-delete-dormitory';

const MODAL_ID = 'delete-dormitory';

export const DeleteDormitoryModal = ({
  id,
  dormitoryName,
}: {
  id: Dormitory['id'];
  dormitoryName: string;
}) => {
  return (
    <Tooltip label="Delete dormitory">
      <ActionIcon
        aria-label="Delete dormitory button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete dormitory',
            children: <ModalContent dormitoryName={dormitoryName} id={id} />,
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
  dormitoryName,
}: {
  id: Dormitory['id'];
  dormitoryName: string;
}) => {
  const { mutate, isPending } = useDeleteDormitory({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete{' '}
        <span className="font-bold">{dormitoryName}</span> dormitory?
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
