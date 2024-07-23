"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma-connect";
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

  redirect(`/forms/nx/${formId}/edit`);
};

export const openRecentForm = async (formId: string) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    await prisma.form.update({
      where: {
        id: formId,
      },

      data: {
        lastOpened: new Date(),
      },
    });
  } catch (error) {
    console.error("error updating lastOpended", error);
  } finally {
    await prisma.$disconnect();
  }

  redirect(`/forms/nx/${formId}/edit`);
};

export const updateFormTitle = async ({
  formId,
  title,
}: {
  formId: string;
  title: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    await prisma.form.update({
      where: {
        id: formId,
      },

      data: {
        title: title,
      },
    });
  } catch (error) {
    console.error("error updating form title", error);
  } finally {
    await prisma.$disconnect();
  }
};
