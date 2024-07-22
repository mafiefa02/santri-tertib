import { createTheme } from '@mantine/core';

import { primary } from '@/styles/font';

export const theme = createTheme({
  primaryColor: 'green',
  primaryShade: { light: 7, dark: 9 },
  fontFamily: primary.style.fontFamily,
  colors: {
    green: [
      '#f1f9f4',
      '#e3efe7',
      '#c2ddcb',
      '#9eccae',
      '#80bd95',
      '#6cb485',
      '#61af7c',
      '#519a6a',
      '#46895d',
      '#37764e',
    ],
  },
});
