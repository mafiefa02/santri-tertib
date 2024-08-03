import { Select, type SelectProps } from '@mantine/core';
import { $Enums } from '@prisma/client';

export const ViolationTypeSelect = (props: SelectProps) => {
  return <Select data={data} {...props} />;
};

const data = [
  { value: $Enums.ViolationType.MINOR, label: 'Minor' },
  { value: $Enums.ViolationType.MODERATE, label: 'Moderate' },
  { value: $Enums.ViolationType.HEAVY, label: 'Heavy' },
];
