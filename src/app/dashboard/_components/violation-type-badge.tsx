import { Badge, type BadgeProps } from '@mantine/core';
import { type $Enums } from '@prisma/client';

import { formatToTitle } from '@/utils/format-to-title';

export const ViolationTypeBadge = ({
  type,
}: {
  type: $Enums.ViolationType;
}) => {
  const variant = getBadgeVariant(type);
  return <Badge variant={variant}>{formatToTitle(type)}</Badge>;
};

const getBadgeVariant = (type: $Enums.ViolationType): BadgeProps['variant'] => {
  switch (type) {
    case 'HEAVY':
      return 'filled';
    case 'MODERATE':
      return 'light';
    case 'MINOR':
      return 'default';
  }
};
