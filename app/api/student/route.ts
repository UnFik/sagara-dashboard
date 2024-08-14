"use server ";

import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const students = await prisma.student.findMany();

  return NextResponse.json({ data: students });
};
