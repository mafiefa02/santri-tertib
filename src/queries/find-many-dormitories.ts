"use server";

import { cache } from "react";

import prisma from "@/config/db";

export const findManyDormitories = cache(async () => prisma.dormitory.findMany())
