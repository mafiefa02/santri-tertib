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

import { ViolationsList } from './_components/violations-list';

const DashboardViolationsPage = () => {
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
            <ViolationsList />
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

const columns = ['Reward Name', 'Type', 'Points'];

export default DashboardViolationsPage;
