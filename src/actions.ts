"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma-connect";
import { getServerSession } from "./lib/getServerSession";
import { revalidatePath } from "next/cache";

export const startANewForm = async ({
  formId,
  title,
}: {
  formId: string;
  title: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    await prisma.form.create({
      data: {
        id: formId,
        title,
        ownerId: session.user.id as string,
      },
    });
  } catch (error) {
    console.error("error creating form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/forms");
};

export const createNewFormTheme = async ({
  formId,
  headerImage,
  backgroundColor,
}: {
  formId: string;
  headerImage: string;
  backgroundColor: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    await prisma.theme.create({
      data: {
        formId,
        headerImage,
        backgroundColor,
      },
    });
  } catch (error) {
    console.error("error creating form theme", error);
  } finally {
    await prisma.$disconnect();
  }
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
  ownerId,
}: {
  formId: string;
  title: string;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;
    if (title.replace(/\s+/g, "").length < 1) return;

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

  revalidatePath("/forms");
  revalidatePath(`/forms/nx/${formId}/edit`);
};

export const deleteForm = async ({
  formId,
  ownerId,
}: {
  formId: string;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;

    await prisma.theme.delete({
      where: {
        formId,
      },
    });

    await prisma.form.delete({
      where: {
        id: formId,
      },
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/forms");
};
