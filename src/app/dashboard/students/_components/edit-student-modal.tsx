'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { type Student } from '@prisma/client';
import { IconEdit } from '@tabler/icons-react';
import type { z } from 'zod';

import { StudentClassSelect } from '@/components/select/student-class-select';
import { StudentDormitorySelect } from '@/components/select/student-dormitory-select';

import { useEditStudent } from '../_hooks/use-edit-student';
import { editStudentSchema } from '../_schemas/edit-student-schema';

const MODAL_ID = 'edit-student';

export const EditStudentModal = ({ student }: { student: Student }) => {
  return (
    <Tooltip label={`Edit ${student.fullName}'s information`}>
      <ActionIcon
        aria-label="Edit student button"
        onClick={() =>
          openModal({
            modalId: MODAL_ID,
            title: `Edit student`,
            children: <ModalContent student={student} />,
          })
        }
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

const ModalContent = ({ student }: { student: Student }) => {
  const { mutate, isPending } = useEditStudent({
    id: student.id,
    onSuccess: () => closeModal(MODAL_ID),
  });

  const form = useForm<z.infer<typeof editStudentSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      fullName: student.fullName,
      classId: student.classId ? student.classId.toString() : '',
      dormitoryId: student.dormitoryId ? student.dormitoryId.toString() : '',
      identityNumber: student.identityNumber,
      address: student.address ?? undefined,
    },
    validate: zodResolver(editStudentSchema),
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.onSubmit((values) => mutate(values))}
    >
      <TextInput
        key={form.key('fullName')}
        withAsterisk
        label="Name"
        placeholder="Enter student's name"
        {...form.getInputProps('fullName')}
      />
      <TextInput
        key={form.key('identityNumber')}
        withAsterisk
        label="Identifier (NIS)"
        placeholder="Enter student's identifier"
        {...form.getInputProps('identityNumber')}
      />
      <TextInput
        key={form.key('address')}
        label="Address"
        placeholder="Enter students's address"
        {...form.getInputProps('address')}
      />
      <StudentClassSelect
        key={form.key('classId')}
        withAsterisk
        label="Class"
        placeholder="Select student's class"
        {...form.getInputProps('classId')}
      />
      <StudentDormitorySelect
        key={form.key('dormitoryId')}
        withAsterisk
        label="Dormitory"
        placeholder="Select student's dormitory"
        {...form.getInputProps('dormitoryId')}
      />
      <div className="mt-4 flex w-full items-center gap-3">
        <Button
          fullWidth
          disabled={isPending}
          type="button"
          variant="default"
          onClick={() => closeModal(MODAL_ID)}
        >
          Cancel
        </Button>
        <Button fullWidth loading={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
