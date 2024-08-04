import { createTheme } from '@mantine/core';

import { primary } from '@/styles/font';

export const theme = createTheme({
  cursorType: 'pointer',
  fontSmoothing: true,
  defaultRadius: 'lg',
  fontFamily: primary.style.fontFamily,
  autoContrast: true,
});
