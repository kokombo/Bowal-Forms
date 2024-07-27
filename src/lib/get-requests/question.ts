/**
 * The function allows a user to get all the questions associated with a form
 */

import { getServerSession } from "../getServerSession";
import { prisma } from "../prisma-connect";

export const getQuestions = async (formId: string) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const questions = await prisma.question.findMany({
      where: {
        formId,
      },
      select: {
        id: true,
        title: true,
        type: true,
        required: true,
        multiChoiceOptions: true,
        checkboxesOptions: true,
        dropDownOptions: true,
        date: true,
        time: true,
        formId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return questions;
  } catch (error) {
    console.error("error getting form details", error);
  } finally {
    await prisma.$disconnect();
  }
};
