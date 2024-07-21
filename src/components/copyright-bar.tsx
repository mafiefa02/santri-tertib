import { Button } from '@mantine/core';
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconWorld,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export const CopyrightBar = () => {
  const socials = [
    {
      label: 'Facebook',
      icon: <IconBrandFacebookFilled size={16} />,
      href: 'https://www.facebook.com/mbssid',
    },
    {
      label: 'Website',
      icon: <IconWorld size={16} />,
      href: 'https://mbss.sch.id',
    },
    {
      label: 'Instagram',
      icon: <IconBrandInstagram size={16} />,
      href: 'https://www.instagram.com/mbs_samarinda/',
    },
  ];

  return (
    <footer className="sticky bottom-0 w-full border-t py-1 text-[0.6rem]">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-[3px]">
          <span className="font-semibold">&copy; 2024</span>
          <Link href="https://mbss.sch.id">
            Madina Boarding School Samarinda
          </Link>
        </div>

        <div className="flex items-center gap-0">
          {socials.map((social) => (
            <Button
              key={social.href}
              component={Link}
              href={social.href}
              size="compact-xs"
              variant="subtle"
            >
              {social.icon}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};
