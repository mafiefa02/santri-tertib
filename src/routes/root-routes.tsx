import { $Enums } from '@prisma/client';
import {
  IconChecklist,
  IconHistory,
  IconLayoutDashboard,
} from '@tabler/icons-react';

export const rootRoutes = [
  {
    icon: <IconLayoutDashboard size={16} />,
    label: 'Dashboard',
    href: '/dashboard',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN],
  },
  {
    icon: <IconHistory size={16} />,
    label: 'History',
    href: '/history',
  },
  {
    icon: <IconChecklist size={16} />,
    label: 'Permits',
    href: '/permits',
    roles: [$Enums.Role.STAFF, $Enums.Role.ADMIN, $Enums.Role.STUDENT],
  },
];
