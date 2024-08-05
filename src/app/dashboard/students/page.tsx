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

import { FilterStudents } from './_components/filter-students';
import { StudentsRegistered } from './_components/students-registered';
import { StudentsSearch } from './_components/students-search';

export const revalidate = 3600; // revalidate every 1 hour

interface SearchParams {
  search?: string;
  dormitory?: string;
  studentClass?: string;
  group?: 'students' | 'dormitories' | 'class';
}

const DashboardStudent = ({ searchParams }: { searchParams: SearchParams }) => {
  const { search, dormitory, studentClass, group = 'students' } = searchParams;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Suspense>
          <StudentsSearch search={search} />
        </Suspense>
        <div className="flex w-full items-center gap-2 md:max-w-max">
          <Suspense>
            <FilterStudents dormitory={dormitory} studentClass={studentClass} />
          </Suspense>
          {/* <AddAccountModal /> */}
        </div>
      </div>
      <TableScrollContainer minWidth={900}>
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
              <StudentsRegistered dormitory={dormitory} search={search} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = [
  'Name',
  'Username',
  'Identity number',
  'Class',
  'Dormitory',
  'Address',
  'Total points',
];

export default DashboardStudent;
