import { Badge, TableTbody, TableTd, TableTr } from '@mantine/core';

import { findManyRewardCategoriesWithRewards } from '../_queries/find-many-reward-categories-with-rewards';
import { findManyRewards } from '../_queries/find-many-rewards';

export const RewardsList = ({
  group,
  category,
}: {
  group?: 'rewards' | 'categories';
  category?: string;
}) => {
  if (group === 'categories')
    return <RewardsListGroupedByCategory category={category} />;
  if (group === 'rewards')
    return <RewardsListGroupedByReward category={category} />;

  return <EmptyState />;
};

const RewardsListGroupedByCategory = async ({
  category,
}: {
  category?: string;
}) => {
  const data = await findManyRewardCategoriesWithRewards({ category });

  if (!data.length) return <EmptyState group="categories" />;

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
    </TableTbody>
  );
};

const RewardsListGroupedByReward = async ({
  category,
}: {
  category?: string;
}) => {
  const data = await findManyRewards({ category });

  if (!data.length) return <EmptyState group="rewards" />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.name}</TableTd>
          <TableTd>{row.points}</TableTd>
          <TableTd>
            {row.category ? row.category.name : 'Tanpa kategori'}
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = ({ group }: { group?: 'rewards' | 'categories' }) => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      {group === 'rewards' && <TableTd>-</TableTd>}
    </TableTr>
  </TableTbody>
);
