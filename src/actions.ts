"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma-connect";
import { revalidateTag } from "next/cache";
import { getServerSession } from "./lib/getServerSession";

export const startANewForm = async ({ formId }: { formId: string }) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    await prisma.form.create({
      data: {
        id: formId,
        ownerId: session?.user.id as string,
      },
    });
  } catch (error) {
    console.error("error creating form", error);
  } finally {
    await prisma.$disconnect();
  }

  //   revalidateTag("forms")
  redirect(`/forms/nx/${formId}/edit`);
};
