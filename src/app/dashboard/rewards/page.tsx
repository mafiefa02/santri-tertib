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

import { AddRewardOrCategory } from './_components/add-reward-or-category';
import { FilterRewards } from './_components/filter-rewards';
import { GroupBySegment } from './_components/group-by-segment';
import { RewardsList } from './_components/rewards-list';
import { getRewardsTableColumns } from './_utils/get-rewards-table-columns';

export const revalidate = 3600; // revalidate every 1 hour

interface SearchParams {
  category?: string;
  group?: 'rewards' | 'categories';
}

const DashboardRewardsPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { category, group = 'categories' } = searchParams;
  const columns = getRewardsTableColumns(group);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <Suspense>
          <GroupBySegment group={group} />
        </Suspense>
        <div className="flex w-full items-center justify-between gap-2 md:max-w-fit">
          <Suspense>
            <FilterRewards category={category} />
          </Suspense>
          <Suspense>
            <AddRewardOrCategory />
          </Suspense>
        </div>
      </div>
      <TableScrollContainer minWidth={420}>
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
              <RewardsList category={category} group={group} />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

export default DashboardRewardsPage;
