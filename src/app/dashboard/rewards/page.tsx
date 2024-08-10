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
import { findManyRewardCategoriesWithRewards } from './_queries/find-many-reward-categories-with-rewards';
import { findManyRewards } from './_queries/find-many-rewards';
import { getRewardsTableColumns } from './_utils/get-rewards-table-columns';

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

  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  group === 'rewards' && void findManyRewards({ category });
  group === 'categories' &&
    void findManyRewardCategoriesWithRewards({ category });

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
        <Paper withBorder className="overflow-hidden">
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
