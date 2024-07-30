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

import { RewardsList } from './_components/rewards-list';

export const revalidate = 3600; // revalidate every 1 hour

const DashboardRewardsPage = () => {
  return (
    <TableScrollContainer minWidth={720}>
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
            <RewardsList />
          </Suspense>
        </Table>
      </Paper>
    </TableScrollContainer>
  );
};

const columns = ['Category', 'Reward(s)'];

export default DashboardRewardsPage;
