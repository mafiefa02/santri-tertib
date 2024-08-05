import { ActionIconGroup, TableTbody, TableTd, TableTr } from '@mantine/core';

import { findManyDormitories } from '../_queries/find-many-dormitories';

import { DeleteDormitoryModal } from './delete-dormitory-modal';
import { EditDormitoryModal } from './edit-dormitory-modal';

export const DormitoryList = async ({ search }: { search?: string }) => {
  const dormitories = await findManyDormitories({ search });
  if (!dormitories.length) return <EmptyState />;

  return (
    <TableTbody>
      {dormitories.map((dormitory) => (
        <TableTr key={dormitory.id}>
          <TableTd>{dormitory.name}</TableTd>
          <TableTd className="max-w-[80ch]">
            {dormitory.address ? dormitory.address : '-'}
          </TableTd>
          <TableTd>{dormitory._count.students} students</TableTd>
          <TableTd>
            <ActionIconGroup className="space-x-2">
              <DeleteDormitoryModal
                dormitoryName={dormitory.name}
                id={dormitory.id}
              />
              <EditDormitoryModal dormitory={dormitory} />
            </ActionIconGroup>
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
