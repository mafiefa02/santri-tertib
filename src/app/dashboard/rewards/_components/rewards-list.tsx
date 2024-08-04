import {
  Badge,
  List,
  ListItem,
  TableTbody,
  TableTd,
  TableTr,
} from '@mantine/core';

import { findManyRewardCategoriesWithRewards } from '../_queries/find-many-reward-categories-with-rewards';
import { findManyRewards } from '../_queries/find-many-rewards';
import { getRewardsTableColumns } from '../_utils/get-rewards-table-columns';

export const RewardsList = ({
  group = 'categories',
  category,
}: {
  group?: 'rewards' | 'categories';
  category?: string;
}) => {
  switch (group) {
    case 'categories':
      return <RewardsListGroupedByCategory category={category} />;
    case 'rewards':
      return <RewardsListGroupedByReward category={category} />;
    default:
      return <EmptyState />;
  }
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
            <List listStyleType="disc" size="sm" spacing="xs">
              {row.rewards.length > 0
                ? row.rewards.map((reward) => (
                    <ListItem
                      key={reward.id}
                      className="max-w-[80ch] text-pretty"
                      icon={<Badge variant="dot">{reward.points} points</Badge>}
                    >
                      {reward.name}
                    </ListItem>
                  ))
                : 'No rewards with this category'}
            </List>
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
          <TableTd className="max-w-[80ch] text-pretty">{row.name}</TableTd>
          <TableTd>{row.points}</TableTd>
          <TableTd>
            {row.category ? row.category.name : 'No category data found'}
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = ({
  group = 'categories',
}: {
  group?: 'rewards' | 'categories';
}) => {
  const columns = getRewardsTableColumns(group);
  return (
    <TableTbody>
      <TableTr>
        {Array.from({ length: columns.length }, (_, index) => (
          <TableTd key={index}>-</TableTd>
        ))}
      </TableTr>
    </TableTbody>
  );
};
