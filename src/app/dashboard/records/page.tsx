import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-body-loading';

import { RewardRecords } from './_components/reward-records';
import { ViolationRecords } from './_components/violation-records';

const DashboardRecordsPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const type = searchParams.type as string | undefined;
  const columns =
    type === 'rewards'
      ? ['Student Name', 'Reward', 'Date', 'Reporter', 'Description', 'Proof']
      : [
          'Student Name',
          'Violation',
          'Date',
          'Reporter',
          'Description',
          'Witness',
          'Proof',
        ];

  return (
    <TableScrollContainer minWidth={768}>
      <Paper withBorder>
        <Table highlightOnHover stickyHeader>
          <TableThead>
            <TableTr className="text-mtn-primary-filled dark:text-mtn-primary-light-color">
              {columns.map((column) => (
                <TableTh key={`${column}column`}>{column}</TableTh>
              ))}
            </TableTr>
          </TableThead>
          <Suspense
            fallback={<TableBodyLoading columnCount={columns.length} />}
          >
            {type === 'rewards' ? <RewardRecords /> : <ViolationRecords />}
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

export default DashboardRecordsPage;
