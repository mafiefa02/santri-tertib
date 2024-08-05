'use server';

import { cache } from 'react';

import prisma from '@/config/db';

export const findManyClasses = cache(async () => prisma.class.findMany());
