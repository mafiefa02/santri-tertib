import {
  Paper,
  Table,
  TableScrollContainer,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { Suspense } from 'react';

import { TableBodyLoading } from '@/components/table-loading';

import { LastLogin } from './_components/last-login';
import {
  StatisticsCard,
  StatisticsCardLoading,
} from './_components/statistics-card';
import { countPermitRecords } from './_queries/count-permit-records';
import { countRewardRecords } from './_queries/count-reward-records';
import { countViolationRecords } from './_queries/count-violation-records';
import { findManyLoginHistory } from './_queries/find-many-login-history';

const DashboardPage = () => {
  // preload data
  // # refer to: https://react.dev/reference/react/cache#preload-data
  void countRewardRecords();
  void countViolationRecords();
  void countPermitRecords();
  void findManyLoginHistory();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-x-3 gap-y-2 mtn-sm:grid-cols-3">
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard fetchFn={countRewardRecords()} name="Rewards" />
        </Suspense>
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard fetchFn={countViolationRecords()} name="Violations" />
        </Suspense>
        <Suspense fallback={<StatisticsCardLoading />}>
          <StatisticsCard fetchFn={countPermitRecords()} name="Permits" />
        </Suspense>
      </div>

      <TableScrollContainer minWidth={768}>
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
              <LastLogin />
            </Suspense>
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

const columns = ['Account Name', 'Username', 'Type', 'Login Time'];

export default DashboardPage;
