import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { Suspense } from 'react';

import prisma from '@/config/db';

import { LastLogin, LastLoginLoading } from './_components/last-login';
import {
  StatisticsCard,
  StatisticsCardLoading,
} from './_components/statistics-card';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-x-3 gap-y-2 mtn-sm:grid-cols-3">
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard
            fetchFn={prisma.rewardRecord.count()}
            name="Rewards"
          />
        </Suspense>
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard
            fetchFn={prisma.violationRecord.count()}
            name="Violations"
          />
        </Suspense>
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard fetchFn={prisma.leaveRecord.count()} name="Permits" />
        </Suspense>
      </div>

      <TableScrollContainer minWidth={768}>
        <Paper withBorder className="overflow-sho">
          <Table highlightOnHover stickyHeader>
            <TableThead>
              <TableTr className="text-mtn-primary-filled">
                <TableTh>Account Name</TableTh>
                <TableTh>Username</TableTh>
                <TableTh>Type</TableTh>
                <TableTh>Login Time</TableTh>
              </TableTr>
            </TableThead>
            <Suspense fallback={<LastLoginLoading />}>
              <LastLogin />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

export default DashboardPage;
