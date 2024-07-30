import { Badge, TableTd, TableTr } from '@mantine/core';
import React from 'react';

import { findManyUncategorizedRewards } from '../_queries/find-many-uncategorized-rewards';

export const UncategorizedRewardsListGroupedByCategory = async () => {
  const data = await findManyUncategorizedRewards();

  return (
    <TableTr>
      <TableTd>Tanpa kategori</TableTd>
      <TableTd>
        <ol className="list-disc space-y-2 pl-4">
          {data.map((row) => (
            <li key={row.id}>
              {row.name}{' '}
              <Badge size="sm" variant="default">
                {row.points} points
              </Badge>
            </li>
          ))}
        </ol>
      </TableTd>
    </TableTr>
  );
};
