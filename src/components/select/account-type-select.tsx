import { Select, type SelectProps } from '@mantine/core';
import { $Enums } from '@prisma/client';

export const AccountTypeSelect = (props: SelectProps) => {
  return <Select data={data} {...props} />;
};

const data = [
  { value: $Enums.Role.ADMIN, label: 'Admin' },
  { value: $Enums.Role.STAFF, label: 'Staff' },
];
