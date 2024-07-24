import { createTheme } from '@mantine/core';

import { primary } from '@/styles/font';

export const theme = createTheme({
  fontFamily: primary.style.fontFamily,
  autoContrast: true,
});
