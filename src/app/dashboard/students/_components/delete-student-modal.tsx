'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { type Student } from '@prisma/client';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteStudent } from '../_hooks/use-delete-student';

const MODAL_ID = 'delete-student';

export const DeleteStudentModal = ({
  id,
  studentName,
}: {
  id: Student['id'];
  studentName: Student['fullName'];
}) => {
  return (
    <Tooltip label={`Delete ${studentName}'s data`}>
      <ActionIcon
        aria-label="Delete student button"
        color="red"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Delete student',
            children: <ModalContent id={id} studentName={studentName} />,
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
  studentName,
}: {
  id: Student['id'];
  studentName: Student['fullName'];
}) => {
  const { mutate, isPending } = useDeleteStudent({
    id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to delete student with name{' '}
        <span className="font-bold">{studentName}</span>
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
