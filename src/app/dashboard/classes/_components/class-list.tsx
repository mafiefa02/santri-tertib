import { ActionIconGroup, TableTbody, TableTd, TableTr } from '@mantine/core';

import { findManyClasses } from '../_queries/find-many-classes';

import { DeleteClassModal } from './delete-class-modal';
import { EditClassModal } from './edit-class-modal';

export const ClassList = async ({ search }: { search?: string }) => {
  const classes = await findManyClasses({ search });
  if (!classes.length) return <EmptyState />;

  return (
    <TableTbody>
      {classes.map((studentClass) => (
        <TableTr key={studentClass.id}>
          <TableTd>{studentClass.name}</TableTd>
          <TableTd>{studentClass._count.students} students</TableTd>
          <TableTd>
            <ActionIconGroup className="space-x-2">
              <DeleteClassModal
                id={studentClass.id}
                nameOfClass={studentClass.name}
              />
              <EditClassModal studentClass={studentClass} />
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
    </TableTr>
  </TableTbody>
);
