import { prisma } from "./prisma-connect";
import { getServerSession } from "./getServerSession";

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
        questions: true,
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
