import { Skeleton, TableTbody, TableTd, TableTr } from '@mantine/core';
import React from 'react';

export const TableBodyLoading = ({
  columnCount,
  rowCount = 10,
}: {
  columnCount: number;
  rowCount?: number;
}) => {
  return (
    <TableTbody>
      {Array.from({ length: rowCount }, (_, index) => (
        <TableTr key={`${index}row`}>
          {Array.from({ length: columnCount }, (_, index) => (
            <TableTd key={`${index}cell`}>
              <Skeleton className="h-5 w-full" />
            </TableTd>
          ))}
        </TableTr>
      ))}
    </TableTbody>
  );
};
