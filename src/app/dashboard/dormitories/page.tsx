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

import { AddDormitoryModal } from './_components/add-dormitory-modal';
import { DormitoryList } from './_components/dormitory-list';
import { DormitorySearch } from './_components/dormitory-search';
import { findManyDormitories } from './_queries/find-many-dormitories';

export const revalidate = 3600; // revalidate every 1 hour

interface SearchParams {
  search?: string;
}

const DashboardDormitories = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { search } = searchParams;

  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  void findManyDormitories({ search });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Suspense>
          <DormitorySearch search={search} />
        </Suspense>
        <Suspense>
          <ModalsProvider>
            <AddDormitoryModal />
          </ModalsProvider>
        </Suspense>
      </div>
      <TableScrollContainer minWidth={640}>
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
              <DormitoryList search={search} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = ['Dormitory', 'Address', 'No. of students', 'Actions'];

export default DashboardDormitories;
