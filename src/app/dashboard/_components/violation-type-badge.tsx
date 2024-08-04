import { Badge, type BadgeProps } from '@mantine/core';
import { type $Enums } from '@prisma/client';

import { formatToTitle } from '@/utils/format-to-title';

interface ViolationTypeBadgeProps extends BadgeProps {
  type: $Enums.ViolationType;
}

export const ViolationTypeBadge = ({
  type,
  ...props
}: ViolationTypeBadgeProps) => {
  const variant = getBadgeVariant(type);
  return (
    <Badge variant={variant} {...props}>
      {formatToTitle(type)}
    </Badge>
  );
};

const getBadgeVariant = (type: $Enums.ViolationType) => {
  switch (type) {
    case 'HEAVY':
      return 'filled';
    case 'MODERATE':
      return 'light';
    case 'MINOR':
      return 'default';
    default:
      return undefined;
  }
};
