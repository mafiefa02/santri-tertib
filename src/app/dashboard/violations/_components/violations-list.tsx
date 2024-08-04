import {
  Badge,
  Group,
  List,
  ListItem,
  TableTbody,
  TableTd,
  TableTr,
} from '@mantine/core';
import { type $Enums } from '@prisma/client';

import { ViolationTypeBadge } from '../../_components/violation-type-badge';
import { findManyViolationCategoriesWithViolation } from '../_queries/find-many-violation-categories-with-violation';
import { findManyViolations } from '../_queries/find-many-violations';
import { getViolationsTableColumns } from '../_utils/get-violations-table-columns';

export const ViolationsList = ({
  group = 'categories',
  category,
  type,
}: {
  category?: string;
  group?: 'categories' | 'violations';
  type?: $Enums.ViolationType;
}) => {
  switch (group) {
    case 'categories':
      return (
        <ViolationsListGroupedByCategory category={category} type={type} />
      );
    case 'violations':
      return (
        <ViolationsListGroupedByViolation category={category} type={type} />
      );
    default:
      return <EmptyState />;
  }
};

const ViolationsListGroupedByCategory = async ({
  type,
  category,
}: {
  type?: $Enums.ViolationType;
  category?: string;
}) => {
  const data = await findManyViolationCategoriesWithViolation({
    category,
    type,
  });

  if (!data.length) return <EmptyState group="categories" />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.name}</TableTd>
          <TableTd>
            <List
              className="max-w-[80ch] text-pretty"
              listStyleType="disc"
              size="sm"
              spacing="xs"
            >
              {row.violations.length > 0
                ? row.violations.map((violation) => (
                    <ListItem key={violation.id}>
                      <Group gap={6}>
                        {violation.name}
                        <Group className="inline-flex" gap={2}>
                          <Badge size="sm" variant="default">
                            {violation.points} points
                          </Badge>
                          <ViolationTypeBadge size="sm" type={violation.type} />
                        </Group>
                      </Group>
                    </ListItem>
                  ))
                : 'No violations with this category'}
            </List>
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const ViolationsListGroupedByViolation = async ({
  type,
  category,
}: {
  type?: $Enums.ViolationType;
  category?: string;
}) => {
  const data = await findManyViolations({ category, type });

  if (!data.length) return <EmptyState group="violations" />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd className="max-w-[80ch] text-pretty">{row.name}</TableTd>
          <TableTd>{row.points}</TableTd>
          <TableTd>
            <ViolationTypeBadge type={row.type} />
          </TableTd>
          <TableTd className="max-w-[80ch] text-pretty">
            {row.category.name}
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = ({
  group = 'categories',
}: {
  group?: 'violations' | 'categories';
}) => {
  const columns = getViolationsTableColumns(group);
  return (
    <TableTbody>
      <TableTr>
        {Array.from({ length: columns.length }, (_, index) => (
          <TableTd key={index}>-</TableTd>
        ))}
      </TableTr>
    </TableTbody>
  );
};
