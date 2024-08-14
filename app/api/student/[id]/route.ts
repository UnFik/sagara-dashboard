"use server"

import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const student = await prisma.student.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({ data: student });
};
