import { Badge } from '@mantine/core';
import type { $Enums } from '@prisma/client';
import React from 'react';

export const AccountTypeBadge = ({ type }: { type: $Enums.Role }) => {
  switch (type) {
    case 'ADMIN':
      return <Badge variant="filled">{type}</Badge>;
    case 'STAFF':
      return <Badge variant="light">{type}</Badge>;
    case 'STUDENT':
      return <Badge variant="outline">{type}</Badge>;
  }
};
