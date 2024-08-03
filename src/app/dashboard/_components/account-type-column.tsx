import { Badge } from '@mantine/core';
import type { $Enums } from '@prisma/client';
import React from 'react';

export const AccountTypeBadge = ({ type }: { type: $Enums.Role }) => {
  const variant = getBadgeVariant(type);
  return <Badge variant={variant}>{type}</Badge>;
};

const getBadgeVariant = (type: $Enums.Role) => {
  switch (type) {
    case 'ADMIN':
      return 'filled';
    case 'STAFF':
      return 'light';
    case 'STUDENT':
      return 'outline';
  }
};
