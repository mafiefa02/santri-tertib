import { $Enums } from '@prisma/client';

export const getAccountTypeSelectOptions = () => {
  return [
    { value: $Enums.Role.ADMIN, label: 'Admin' },
    { value: $Enums.Role.STAFF, label: 'Staff' },
  ];
};
