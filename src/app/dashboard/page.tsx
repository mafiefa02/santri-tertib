import { Card } from '@mantine/core';
import React from 'react';

const StatisticsCard = ({
  name,
  value,
  date,
}: {
  name: string;
  value: number;
  date: string;
}) => {
  return (
    <Card withBorder className="flex flex-row items-center justify-between">
      <span className="text-xl font-bold">{value}</span>
      <div className="flex flex-col items-end gap-0">
        <span className="text-xs text-gray-400 dark:text-mtn-dark-2">
          {date}
        </span>
        <span className="text-sm">{name}</span>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-2 mtn-sm:grid-cols-3">
      <StatisticsCard date="24/07/2024" name="Rewards" value={36} />
      <StatisticsCard date="24/07/2024" name="Violations" value={58} />
      <StatisticsCard date="24/07/2024" name="Permits" value={2} />
    </div>
  );
};

export default DashboardPage;
