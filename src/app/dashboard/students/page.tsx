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

import { AddStudentModal } from './_components/add-student-modal';
import { FilterStudents } from './_components/filter-students';
import { StudentsRegistered } from './_components/students-registered';
import { StudentsSearch } from './_components/students-search';
import { findManyStudents } from './_queries/find-many-students';

interface SearchParams {
  search?: string;
  dormitory?: string;
  studentClass?: string;
}

const DashboardStudent = ({ searchParams }: { searchParams: SearchParams }) => {
  const { search, dormitory, studentClass } = searchParams;

  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  void findManyStudents({ search, dormitory, studentClass });

  return (
    <ModalsProvider>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Suspense>
            <StudentsSearch search={search} />
          </Suspense>
          <div className="flex w-full items-center gap-2 md:max-w-max">
            <Suspense>
              <FilterStudents
                dormitory={dormitory}
                studentClass={studentClass}
              />
            </Suspense>
            <Suspense>
              <AddStudentModal />
            </Suspense>
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
                <StudentsRegistered
                  dormitory={dormitory}
                  search={search}
                  studentClass={studentClass}
                />
              </Suspense>
            </Table>
          </Paper>
        </TableScrollContainer>
      </div>
    </ModalsProvider>
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
  'Actions',
];

export default DashboardStudent;
