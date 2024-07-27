"use server";

import { redirect } from "next/navigation";
import { prisma } from "./lib/prisma-connect";
import { getServerSession } from "./lib/getServerSession";
import { revalidatePath } from "next/cache";

/**
 * The function allows a user to create a new form
 */

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
        title: title.trim(),
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

/**
 * The function allows a user to select one of the existing themes for a new form
 */

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

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;

    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
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

    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
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

  revalidatePath("/forms");
  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to update form description
 */

export const updateFormDescription = async ({
  formId,
  description,
  ownerId,
}: {
  formId: string;
  description: string;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;
    if (description.replace(/\s+/g, "").length < 1) return;

    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
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

  revalidatePath(`/forms/nx/${formId}/edit`);
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

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;

    const existingForm = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!existingForm) return;

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

// model Question {
//   id                 String         @id @default(uuid())
//   title              String?
//   type               QUESTION_TYPE?
//   required           Boolean        @default(false)
//   multiChoiceOptions String[]
//   checkboxesOptions  String[]
//   dropDownOptions    String[]
//   date               DateTime?
//   time               DateTime?
//   form               Form           @relation(fields: [formId], references: [id])
//   formId             String
// }

/**
 * The function allows a user to create/start a new question in a form
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

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;

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
};

/**
 * The function allows a user to create a short answer text question in a form
 */

export const createShortAnswerTextQuestion = async ({
  formId,
  title,
  required,
  questionId,
  ownerId,
}: {
  formId: string;
  title: string;
  required: boolean;
  questionId: string | undefined;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;
    if (title.replace(/\s+/g, "").length < 1) return;

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
        type: "SHORT_ANSWER",
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
};

/**
 * The function allows a user to create a paragraph answer question in a form
 */

export const createParagraphAnswerQuestion = async ({
  formId,
  title,
  required,
  questionId,
  ownerId,
}: {
  formId: string;
  title: string;
  required: boolean;
  questionId: string | undefined;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;
    if (title.replace(/\s+/g, "").length < 1) return;

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
        type: "PARAGRAPH",
        formId,
        title: title.trim(),
        required,
      },
    });
  } catch (error) {
    console.error("error creating paragraph answer question", error);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * The function allows a user to create a multi choice answer question in a form
 */

export const createMultiChoiceAnswerQuestion = async ({
  formId,
  title,
  required,
  multiChoiceOptions,
  questionId,
  ownerId,
}: {
  formId: string;
  title: string;
  required: boolean;
  multiChoiceOptions: string[];
  questionId: string | undefined;
  ownerId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;
    if (title.replace(/\s+/g, "").length < 1) return;

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
        type: "MULTIPLE_CHOICE",
        formId,
        title: title.trim(),
        required,
        multiChoiceOptions,
      },
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }
};
