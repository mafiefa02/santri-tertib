import { Card, Skeleton } from '@mantine/core';
import type { Prisma } from '@prisma/client';

export const StatisticsCardLoading = () => (
  <Skeleton className="h-[72px] w-full" />
);

export const StatisticsCard = async ({
  name,
  fetchFn,
}: {
  name: string;
  fetchFn: Prisma.PrismaPromise<number>;
}) => {
  const value = await fetchFn;

  return (
    <Card
      withBorder
      className="flex cursor-pointer flex-row items-center justify-between hover:bg-gray-50"
    >
      <span className="text-xl font-bold text-mtn-primary-filled">{value}</span>
      <div className="flex flex-col items-end gap-0">
        <span className="text-xs text-gray-400 dark:text-mtn-dark-2">
          Total recorded
        </span>
        <span className="text-sm font-semibold text-mtn-primary-filled">
          {name}
        </span>
      </div>
    </Card>
  );
};
