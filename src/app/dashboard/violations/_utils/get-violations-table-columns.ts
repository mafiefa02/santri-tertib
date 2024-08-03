export const getViolationsTableColumns = (
  group: 'violations' | 'categories',
) => {
  switch (group) {
    case 'violations':
      return ['Violation', 'Points', 'Type', 'Category'];
    case 'categories':
      return ['Category', 'Violation(s)'];
  }
};
