'use client';

import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { modals, openModal } from '@mantine/modals';
import type { Student } from '@prisma/client';
import { IconKey } from '@tabler/icons-react';

import { useResetStudentPassword } from '../_hooks/use-reset-student-password';

const MODAL_ID = 'reset-student-password';

export const ResetStudentPasswordModal = ({
  studentId,
  studentFullName,
}: {
  studentId: Student['id'];
  studentFullName: Student['fullName'];
}) => {
  return (
    <Tooltip label={`Reset ${studentFullName}'s password`}>
      <ActionIcon
        aria-label="Reset password button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: 'Reset password',
            children: (
              // We can't render modal content here directly because the isPending state somehow doesn't change
              <ModalContent
                studentFullName={studentFullName}
                studentId={studentId}
              />
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
  studentId,
  studentFullName,
}: {
  studentId: Student['id'];
  studentFullName: Student['fullName'];
}) => {
  const { mutate, isPending } = useResetStudentPassword({
    id: studentId,
    onSuccess: () => modals.close(MODAL_ID),
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        Are you sure you want to reset password for the student{' '}
        <span className="font-bold">{studentFullName}</span>?
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
