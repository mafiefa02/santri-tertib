'use client';

import { Badge, Group } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

interface SearchParams {
  dormitory?: string;
  studentClass?: string;
}

export const ActiveFiltersBadge = () => {
  const searchParams = useSearchParams();
  const dormitory = searchParams.get('dormitory') as SearchParams['dormitory'];
  const studentClass = searchParams.get(
    'studentClass',
  ) as SearchParams['studentClass'];

  return (
    <Group className="inline-flex" gap={4}>
      {dormitory ? (
        <Badge size="xs" variant="dot">
          Dormitory
        </Badge>
      ) : null}
      {studentClass ? (
        <Badge size="xs" variant="dot">
          Class
        </Badge>
      ) : null}
    </Group>
  );
};
