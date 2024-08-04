import { Badge, Group } from '@mantine/core';
import { type $Enums } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

interface SearchParams {
  type?: $Enums.ViolationType;
  category?: string;
}

export const ActiveFiltersBadge = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as SearchParams['type'];
  const category = searchParams.get('category') as SearchParams['category'];

  return (
    <Group className="inline-flex" gap={4}>
      {type ? (
        <Badge size="xs" variant="dot">
          Type
        </Badge>
      ) : null}
      {category ? (
        <Badge size="xs" variant="dot">
          Category
        </Badge>
      ) : null}
    </Group>
  );
};
