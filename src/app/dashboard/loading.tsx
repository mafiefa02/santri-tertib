import {
  Paper,
  Skeleton,
  Table,
  TableScrollContainer,
  TableThead,
} from '@mantine/core';

import { TableBodyLoading, TableRowLoading } from '@/components/table-loading';

const LoadingDashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-9 max-w-96 w-full" />
        <div className="flex w-full items-center gap-2 md:max-w-48">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-11 rounded-full" />
        </div>
      </div>
      <TableScrollContainer minWidth={640}>
        <Paper withBorder className="overflow-hidden">
          <Table highlightOnHover stickyHeader>
            <TableThead>
              <TableRowLoading columnCount={3} rowCount={1} />
            </TableThead>
            <TableBodyLoading columnCount={3} />
          </Table>
        </Paper>
      </TableScrollContainer>
    </div>
  );
};

export default LoadingDashboard;
