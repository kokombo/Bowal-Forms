"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/prisma-connect";
import { getServerSession } from "./lib/getServerSession";
import { revalidatePath } from "next/cache";
import type { $Enums } from "@prisma/client";

/**
 * The function allows a user to create a new form
 */

export const startANewForm = async ({
  formId,
  title,
  headerImage,
  backgroundColor,
}: {
  formId: string;
  title: string;
  headerImage: string;
  backgroundColor: string;
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    await prisma.$transaction(async (prisma) => {
      const form = await prisma.form.create({
        data: {
          id: formId,
          title: title.trim(),
          ownerId: session.user.id as string,
        },
      });

      await prisma.theme.create({
        data: {
          formId: form.id,
          headerImage,
          backgroundColor,
        },
      });
    });
  } catch (error) {
    console.error("error creating form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/forms");
  redirect(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to update form theme
 */

export const updateFormTheme = async ({
  formId,
  headerImage,
  backgroundColor,
}: {
  formId: string;
  headerImage: string;
  backgroundColor: string;
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    const existingTheme = await prisma.theme.findUnique({
      where: {
        formId,
      },
    });

    if (!existingTheme) return;

    await prisma.theme.update({
      where: {
        formId,
      },
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

/**
 * The function updates the last time a user opens a form
 */

export const openRecentForm = async ({
  formId,
  ownerId,
}: {
  formId: string;
  ownerId: string;
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
        ownerId: session.user.id,
      },
    });

    if (!existingForm) return;

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

/**
 * The function allows a user to update form title
 */

export const updateFormTitle = async ({
  formId,
  title,
}: {
  formId: string;
  title: string;
}) => {
  const session = await getServerSession();

  if (!session) return;
  if (title.replace(/\s+/g, "").length < 1) return;

  try {
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
        ownerId: session.user.id,
      },
    });

    if (!existingForm) return;

    await prisma.form.update({
      where: {
        id: formId,
      },

      data: {
        title: title.trim(),
      },
    });
  } catch (error) {
    console.error("error updating form title", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/forms", "page");
  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to update form description
 */

export const updateFormDescription = async ({
  formId,
  description,
}: {
  formId: string;
  description: string;
}) => {
  const session = await getServerSession();

  if (!session) return;
  if (description.replace(/\s+/g, "").length < 1) return;

  try {
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
        ownerId: session.user.id,
      },
    });

    if (!existingForm) return;

    await prisma.form.update({
      where: {
        id: formId,
      },

      data: {
        description: description.trim(),
      },
    });
  } catch (error) {
    console.error("error updating form title", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to delete a form
 */

export const deleteForm = async ({
  formId,
  ownerId,
}: {
  formId: string;
  ownerId: string;
}) => {
  const session = await getServerSession();
  if (!session) return;

  try {
    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
        ownerId: session.user.id,
      },
    });

    if (!existingForm) return;

    // Check if theme exists
    const existingTheme = await prisma.theme.findUnique({
      where: {
        formId,
      },
    });

    if (!existingTheme) return;

    await prisma.$transaction(async (prisma) => {
      // Find questions associated with the form
      const questions = await prisma.question.findMany({
        where: {
          formId,
        },
      });

      // Find responses associated with the form
      const responses = await prisma.response.findMany({
        where: {
          formId,
        },
      });

      // Delete the theme associated with the form
      await prisma.theme.delete({
        where: {
          formId,
        },
      });

      // Delete the questions associated with the form (if any)
      if (questions.length > 0) {
        for (const question of questions) {
          await deleteQuestion({ questionId: question.id, formId, ownerId });
        }
      }

      // Delete the responses associated with the form (if any)
      if (responses.length > 0) {
        await prisma.response.deleteMany({
          where: {
            formId,
          },
        });
      }

      // Delete the form itself
      await prisma.form.delete({
        where: {
          id: formId,
        },
      });
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/forms");
};

/**
 * The function allows a user to create a new question to a form
 */

export const createNewQuestion = async ({
  questionId,
  formId,
  ownerId,
}: {
  questionId: string;
  formId: string;
  ownerId: string;
}) => {
  const session = await getServerSession();

  if (!session) return;
  if (ownerId !== session.user.id) return;

  try {
    await prisma.question.create({
      data: {
        id: questionId,
        formId,
      },
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to update a question in a form
 */

export const updateQuestion = async ({
  formId,
  title,
  required,
  questionId,
  ownerId,
  type,
}: {
  formId: string;
  title: string;
  required: boolean;
  questionId: string;
  ownerId: string;
  type: $Enums.QUESTION_TYPE | null;
}) => {
  const session = await getServerSession();

  if (!session) return;
  if (ownerId !== session.user.id) return;
  if (title.replace(/\s+/g, "").length < 1) return;

  try {
    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!existingQuestion) return;

    await prisma.question.update({
      where: {
        id: existingQuestion.id,
      },
      data: {
        type,
        formId,
        title: title.trim(),
        required,
      },
    });
  } catch (error) {
    console.error("error creating short answer question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to delete a question associated with a form
 */

export const deleteQuestion = async ({
  questionId,
  ownerId,
  formId,
}: {
  questionId: string;
  ownerId: string;
  formId: string;
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    if (ownerId !== session.user.id) return;

    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!existingQuestion) return;

    await prisma.$transaction(async (prisma) => {
      // Delete all options related to the question if any exist
      const options = await prisma.option.findMany({
        where: {
          questionId: existingQuestion.id,
        },
      });

      if (options.length > 0) {
        await prisma.option.deleteMany({
          where: {
            questionId: existingQuestion.id,
          },
        });
      }

      // Delete the question itself
      await prisma.question.delete({
        where: {
          id: questionId,
        },
      });
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to create options for question
 */

export const createQuestionOption = async ({
  value,
  label,
  questionId,
  formId,
  optionId,
}: {
  value: string;
  label: string;
  questionId: string;
  formId: string;
  optionId: string;
}) => {
  const session = await getServerSession();

  if (!session) return;
  if (value.replace(/\s+/g, "").length < 1) return;

  try {
    const existingOption = await prisma.option.findUnique({
      where: {
        id: optionId,
      },
    });

    if (existingOption) {
      if (existingOption.value === value) return;

      await prisma.option.update({
        where: {
          id: optionId,
        },
        data: {
          id: optionId,
          value,
          label,
          questionId,
        },
      });
    } else {
      await prisma.option.create({
        data: {
          id: optionId,
          value,
          label,
          questionId,
        },
      });
    }
  } catch (error) {
    console.error("error creating option", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

export const deleteQuestionOption = async ({
  formId,
  optionId,
}: {
  formId: string;
  optionId: string;
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    const existingOption = await prisma.option.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!existingOption) return;

    await prisma.option.delete({
      where: {
        id: optionId,
      },
    });
  } catch (error) {
    console.error("error deleting option", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`, "page");
};

/**
 * The function allows a user to submit a form
 */

export const submitForm = async ({
  formId,
  answers,
}: {
  formId: string;
  answers: Answer[];
}) => {
  const session = await getServerSession();

  if (!session) return;

  try {
    const response = await prisma.response.create({
      data: {
        formId,
      },
    });

    if (!response) return;

    for (const answer of answers) {
      await prisma.answer.create({
        data: {
          questionId: answer.questionId,
          questionTitle: answer.questionTitle,
          answer: answer.answer,
          responseId: response.id,
        },
      });
    }
  } catch (error) {
    console.error("error submitting form", error);
  } finally {
    await prisma.$disconnect();
  }
};
