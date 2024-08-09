import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-loading';

import { AddClassModal } from './_components/add-class-modal';
import { ClassList } from './_components/class-list';
import { ClassSearch } from './_components/class-search';
import { findManyClasses } from './_queries/find-many-classes';

export const revalidate = 3600; // revalidate every 1 hour

interface SearchParams {
  search?: string;
}

const DashboardClasses = ({ searchParams }: { searchParams: SearchParams }) => {
  const { search } = searchParams;

  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  void findManyClasses({ search });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Suspense>
          <ClassSearch search={search} />
        </Suspense>
        <Suspense>
          <ModalsProvider>
            <AddClassModal />
          </ModalsProvider>
        </Suspense>
      </div>
      <TableScrollContainer minWidth={420}>
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
              <ClassList search={search} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = ['Class', 'No. of students', 'Actions'];

export default DashboardClasses;
