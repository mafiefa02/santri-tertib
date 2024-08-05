import { TableTbody, TableTd, TableTr } from '@mantine/core';

import { findManyStudents } from '../_queries/find-many-students';

export const StudentsRegistered = async ({
  search,
  dormitory,
  group,
}: {
  search?: string;
  dormitory?: string;
  group?: 'students' | 'dormitories';
}) => {
  const data = await findManyStudents({ search, dormitory });
  if (!data.length) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.fullName}</TableTd>
          <TableTd>{row.username}</TableTd>
          <TableTd>{row.identityNumber}</TableTd>
          <TableTd>{row.totalPoints}</TableTd>
          <TableTd>{row.dormitory ? row.dormitory.name : '-'}</TableTd>
          <TableTd>{row.address} </TableTd>
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
    </TableTr>
  </TableTbody>
);
