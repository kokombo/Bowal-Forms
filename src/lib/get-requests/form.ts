import { getServerSession } from "../getServerSession";
import { prisma } from "../prisma-connect";

/**
 * The function allows a user to get all of their forms
 */

export const getForms = async () => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const forms = await prisma.form.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        shareableURL: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
        lastOpened: true,
        image: true,
        theme: true,
      },
      orderBy: {
        lastOpened: "desc",
      },
    });

    return forms;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * The function allows a user to get the details of a form
 */

export const getFormDetails = async (formId: string) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        shareableURL: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
        lastOpened: true,
        image: true,
        theme: true,
      },
    });

    return form;
  } catch (error) {
    console.error("error getting form details", error);
  } finally {
    await prisma.$disconnect();
  }
};
