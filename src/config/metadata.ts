import type { Metadata } from 'next';

export const rootMetadata: Metadata = {
  title: {
    template: '%s | Santri Tertib',
    default: 'Santri Tertib',
  },
  description:
    'An application to track records of students reward and violation of rules history',
  applicationName: 'Santri Tertib',
  publisher: 'Madina Boarding School Samarinda',
  creator: 'Madina Boarding School Samarinda',
  metadataBase: new URL('https://santrib.mbss.sch.id/'),
  authors: {
    name: 'Muhammad Afief Abdurrahman',
    url: 'https://afief.toscamedia.net',
  },
};
