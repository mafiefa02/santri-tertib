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

import { StudentsRegistered } from './_components/students-registered';

const DashboardStudent = () => {
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
            <StudentsRegistered />
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

const columns = ['Student name', 'Username', 'Identity number', 'Total points'];

export default DashboardStudent;
