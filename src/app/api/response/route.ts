import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-connect";
import { getServerSession } from "@/lib/getServerSession";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  const formId = req.nextUrl.searchParams.get("formId") as string;
  const ownerId = req.nextUrl.searchParams.get("ownerId");

  try {
    if (!session) {
      return NextResponse.json(
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    if (session.user.id !== ownerId) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    }

    const responses = await prisma.response.findMany({
      where: {
        formId,
      },
      select: {
        id: true,
        answers: true,
        createdAt: true,
        formId: true,
      },
    });

    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {};

export const PATCH = async (req: NextRequest) => {};
