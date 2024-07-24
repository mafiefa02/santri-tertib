import { Suspense } from 'react';

import prisma from '@/config/db';

import {
  StatisticsCard,
  StatisticsCardLoading,
} from './_components/statistics-card';

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-2 mtn-sm:grid-cols-3">
      <Suspense fallback={<StatisticsCardLoading />}>
        <StatisticsCard fetchFn={prisma.rewardRecord.count()} name="Rewards" />
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
  );
};

export default DashboardPage;
