import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-connect";

export const GET = async (req: NextRequest) => {};

export const POST = async (req: NextRequest) => {
  const { formId, questionId, questionTitle, answer } = await req.json();

  const response = await prisma.response.create({
    data: {
      formId,
      questionId,
      questionTitle,
      answer,
    },
  });
};

export const DELETE = async (req: NextRequest) => {};

export const PATCH = async (req: NextRequest) => {};
