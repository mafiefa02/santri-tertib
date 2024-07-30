import { Badge, TableTbody, TableTd, TableTr } from '@mantine/core';
import { Suspense } from 'react';

import { TableRowLoading } from '@/components/table-loading';

import { findManyRewardCategoriesWithRewards } from '../_queries/find-many-reward-categories-with-rewards';

import { UncategorizedRewardsList } from './uncategorized-rewards-list';

export const RewardsList = async () => {
  const data = await findManyRewardCategoriesWithRewards();

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.name}</TableTd>
          <TableTd>
            <ol className="list-disc space-y-2 pl-4">
              {row.rewards.map((reward) => (
                <li key={reward.id}>
                  {reward.name}{' '}
                  <Badge size="sm" variant="default">
                    {reward.points} points
                  </Badge>
                </li>
              ))}
            </ol>
          </TableTd>
        </TableTr>
      ))}
      <Suspense fallback={<TableRowLoading columnCount={2} rowCount={5} />}>
        <UncategorizedRewardsList />
      </Suspense>
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
