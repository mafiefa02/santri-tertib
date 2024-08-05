import { ActionIconGroup, TableTbody, TableTd, TableTr } from '@mantine/core';

import { findManyStudents } from '../_queries/find-many-students';

import { DeleteStudentModal } from './delete-student-modal';
import { EditStudentModal } from './edit-student-modal';
import { ResetStudentPasswordModal } from './reset-student-password-modal';

export const StudentsRegistered = async ({
  studentClass,
  search,
  dormitory,
}: {
  studentClass?: string;
  search?: string;
  dormitory?: string;
}) => {
  const students = await findManyStudents({ search, dormitory, studentClass });

  if (!students.length) return <EmptyState />;

  return (
    <TableTbody>
      {students.map((student) => (
        <TableTr key={student.id}>
          <TableTd>{student.fullName}</TableTd>
          <TableTd>{student.username}</TableTd>
          <TableTd>{student.identityNumber}</TableTd>
          <TableTd>{student.class ? student.class.name : '-'}</TableTd>
          <TableTd>{student.dormitory ? student.dormitory.name : '-'}</TableTd>
          <TableTd>{student.address ?? '-'} </TableTd>
          <TableTd>{student.totalPoints}</TableTd>
          <TableTd>
            <ActionIconGroup className="space-x-2">
              <EditStudentModal student={student} />
              <ResetStudentPasswordModal
                studentFullName={student.fullName}
                studentId={student.id}
              />
              <DeleteStudentModal
                id={student.id}
                studentName={student.fullName}
              />
            </ActionIconGroup>
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
