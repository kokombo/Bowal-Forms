import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-connect";
import { getServerSession } from "@/lib/getServerSession";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  const { searchParams } = new URL(req.url);
  const formId = searchParams.get("formId") as string;
  const ownerId = searchParams.get("ownerId") as string;

  try {
    if (!session) {
      return NextResponse.json(
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    if (session.user.id !== ownerId) {
      //Change this to NextResponse.redirect later on
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
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest) => {};

export const PATCH = async (req: NextRequest) => {};
