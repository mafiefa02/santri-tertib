import { Badge, type BadgeProps } from '@mantine/core';
import type { $Enums } from '@prisma/client';
import React from 'react';

interface AccountTypeBadgeProps extends BadgeProps {
  type: $Enums.Role;
}

export const AccountTypeBadge = ({ type, ...props }: AccountTypeBadgeProps) => {
  const variant = getBadgeVariant(type);
  return (
    <Badge size="sm" variant={variant} {...props}>
      {type}
    </Badge>
  );
};

const getBadgeVariant = (type: $Enums.Role) => {
  switch (type) {
    case 'ADMIN':
      return 'filled';
    case 'STAFF':
      return 'light';
    case 'STUDENT':
      return 'outline';
    default:
      return undefined;
  }
};
