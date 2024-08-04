import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-loading';

import { PermitRecords } from './_components/permit-records';

const DashboardPermitsPage = () => {
  return (
    <TableScrollContainer minWidth={1440}>
      <Paper withBorder className="overflow-hidden">
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
            <PermitRecords />
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

const columns = [
  'Student Name',
  'Guardian Name',
  'Created At',
  'Time Limit',
  'Leave Date',
  'Return Date',
  'Leave Type',
  'Destination',
];

export default DashboardPermitsPage;
