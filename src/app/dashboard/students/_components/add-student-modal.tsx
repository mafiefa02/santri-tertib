'use client';

import { ActionIcon, Button, List, ListItem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, openModal } from '@mantine/modals';
import { IconClipboard, IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import type { z } from 'zod';

import { StudentClassSelect } from '@/components/student-class-select';
import { StudentDormitorySelect } from '@/components/student-dormitory-select';

import { useCreateStudent } from '../_hooks/use-create-student';
import { createStudentSchema } from '../_schemas/create-student-schema';

const MODAL_ID = 'add-new-student';
const CONFIRM_MODAL_ID = 'success-add-student';

export const AddStudentModal = () => {
  return (
    <ActionIcon
      aria-label="Add student button"
      className="bg-mtn-primary-filled text-white"
      size="input-sm"
      variant="filled"
      onClick={() =>
        openModal({
          modalId: MODAL_ID,
          title: 'Add new student',
          children: <ModalContent />,
        })
      }
    >
      <IconPlus size={16} />
    </ActionIcon>
  );
};

const ModalContent = () => {
  const { mutate, isPending } = useCreateStudent({
    onSuccess: (data) => {
      closeModal(MODAL_ID);
      openModal({
        modalId: CONFIRM_MODAL_ID,
        title: 'New student account',
        children: <ConfirmModalContent {...data} />,
      });
    },
  });

  const form = useForm<z.infer<typeof createStudentSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(createStudentSchema),
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

const ConfirmModalContent = ({
  fullName,
  username,
  password,
}: {
  fullName: string;
  username: string;
  password: { password: string } | null;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p>We have created a new student account!</p>
        <List listStyleType="disc" spacing={6}>
          <ListItem>
            Name: <pre className="inline">{fullName}</pre>
          </ListItem>
          <ListItem>
            Username: <pre className="inline">{username}</pre>
          </ListItem>
          <ListItem>
            Password:{' '}
            <pre className="inline">
              {password?.password ? username : 'No password!'}
            </pre>
          </ListItem>
        </List>
      </div>
      <div className="flex w-full items-center gap-3">
        <Button
          fullWidth
          leftSection={<IconClipboard size={16} />}
          type="button"
          variant="default"
          onClick={() => {
            void navigator.clipboard.writeText(username);
            toast.info('Login information copied to clipboard.');
          }}
        >
          Copy
        </Button>
        <Button fullWidth onClick={() => closeModal(CONFIRM_MODAL_ID)}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
