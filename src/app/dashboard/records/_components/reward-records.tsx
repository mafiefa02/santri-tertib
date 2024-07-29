import { TableTbody, TableTd, TableTr } from '@mantine/core';
import dayjs from 'dayjs';

import prisma from '@/config/db';

export const RewardRecords = async () => {
  const data = await prisma.rewardRecord.findMany({
    include: {
      student: {
        select: { id: true, fullName: true },
      },
      reportedBy: {
        select: { id: true, displayName: true },
      },
      reward: {
        select: { id: true, name: true },
      },
    },
  });

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.student.fullName}</TableTd>
          <TableTd>{row.reward.name}</TableTd>
          <TableTd>{dayjs(row.createdAt).format()}</TableTd>
          <TableTd>{row.reportedBy?.displayName ?? '-'}</TableTd>
          <TableTd>{row.description}</TableTd>
          <TableTd>{row.proof}</TableTd>
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
