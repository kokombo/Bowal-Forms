/**
 * The function allows a user to get all the questions associated with a form
 */

import { cache } from "react";
import { prisma } from "../prisma-connect";

export const getQuestions = cache(async (formId: string) => {
  try {
    const questions = await prisma.question.findMany({
      where: {
        formId,
      },
      include: {
        options: true,
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
});
