import { getServerSession } from "./getServerSession";
import { prisma } from "./prisma-connect";

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
        questions: true,
      },
    });

    return form;
  } catch (error) {
    console.error("error getting form details", error);
  } finally {
    await prisma.$disconnect();
  }
};
