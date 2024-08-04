import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { type $Enums } from '@prisma/client';
import React, { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-loading';

import { AddViolationOrCategory } from './_components/add-violation-or-category';
import { FilterViolations } from './_components/filter-violations';
import { SegmentGroupBy } from './_components/segment-group-by';
import { ViolationsList } from './_components/violations-list';
import { getViolationsTableColumns } from './_utils/get-violations-table-columns';

export const revalidate = 3600; // revalidate every 1 hour

interface SearchParams {
  category?: string;
  group?: 'violations' | 'categories';
  type?: $Enums.ViolationType;
}

const DashboardViolationsPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { category, type, group = 'categories' } = searchParams;
  const columns = getViolationsTableColumns(group);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <Suspense>
          <SegmentGroupBy group={group} />
        </Suspense>
        <div className="flex w-full items-center justify-between gap-2 md:max-w-fit">
          <Suspense>
            <FilterViolations category={category} type={type} />
          </Suspense>
          <Suspense>
            <AddViolationOrCategory />
          </Suspense>
        </div>
      </div>
      <TableScrollContainer minWidth={520}>
        <Paper withBorder>
          <Table highlightOnHover stickyHeader withColumnBorders>
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
              <ViolationsList category={category} group={group} type={type} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

export default DashboardViolationsPage;
