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
  headerImage,
  backgroundColor,
}: {
  formId: string;
  title: string;
  headerImage: string;
  backgroundColor: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const form = await prisma.form.create({
      data: {
        id: formId,
        title: title.trim(),
        ownerId: session.user.id as string,
      },
    });

    const theme = await prisma.theme.create({
      data: {
        formId: form.id,
        headerImage,
        backgroundColor,
      },
    });

    if (!theme) return;
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

  try {
    if (!session) return;

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

    const existingTheme = await prisma.theme.findUnique({
      where: {
        formId,
      },
    });

    if (!existingForm || !existingTheme) return;

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

  revalidatePath(`/forms/nx/${formId}/edit`);
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

  try {
    if (!session) return;
    if (ownerId !== session.user.id) return;

    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!existingQuestion) return;

    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });
  } catch (error) {
    console.error("error deleting form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
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
  questionId: string;
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

  revalidatePath(`/forms/nx/${formId}/edit`);
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
  questionId: string;
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

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to create a multi choice answer question in a form
 */

export const createMultiChoiceAnswerQuestion = async ({
  formId,
  title,
  required,
  questionId,
  ownerId,
}: {
  formId: string;
  title: string;
  required: boolean;
  questionId: string;
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
      },
    });
  } catch (error) {
    console.error("error creating multi choice form", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to create options for a multi choice question
 */

export const createOptionForMultiChoiceQuestion = async ({
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

  try {
    if (!session) return;
    if (value.replace(/\s+/g, "").length < 1) return;

    const existingOption = await prisma.multipleChoiceOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (existingOption) {
      if (existingOption.value === value) return;

      await prisma.multipleChoiceOption.update({
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
      await prisma.multipleChoiceOption.create({
        data: {
          id: optionId,
          value,
          label,
          questionId,
        },
      });
    }
  } catch (error) {
    console.error("error creating option for multichoice question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to delete a multiple choice answer option
 */

export const deleteMultipleChoiceOption = async ({
  formId,
  optionId,
}: {
  formId: string;
  optionId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const existingOption = await prisma.multipleChoiceOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!existingOption) return;

    await prisma.multipleChoiceOption.delete({
      where: {
        id: optionId,
      },
    });
  } catch (error) {
    console.error("error deleting option for multichoice question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to create checkboxes answer question in a form
 */

export const createCheckboxAnswerQuestion = async ({
  formId,
  title,
  required,
  questionId,
  ownerId,
}: {
  formId: string;
  title: string;
  required: boolean;
  questionId: string;
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
        type: "CHECKBOXES",
        formId,
        title: title.trim(),
        required,
      },
    });
  } catch (error) {
    console.error("error creating checkbox question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to create options for a multi choice question
 */

export const createOptionForCheckboxQuestion = async ({
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

  try {
    if (!session) return;
    if (value.replace(/\s+/g, "").length < 1) return;

    const existingOption = await prisma.checkBoxOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (existingOption) {
      if (existingOption.value === value) return;

      await prisma.checkBoxOption.update({
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
      await prisma.checkBoxOption.create({
        data: {
          id: optionId,
          value,
          label,
          questionId,
        },
      });
    }
  } catch (error) {
    console.error("error creating option for checkbox question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};

/**
 * The function allows a user to delete a checkbox answer option
 */

export const deleteCheckboxOption = async ({
  formId,
  optionId,
}: {
  formId: string;
  optionId: string;
}) => {
  const session = await getServerSession();

  try {
    if (!session) return;

    const existingOption = await prisma.checkBoxOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!existingOption) return;

    await prisma.checkBoxOption.delete({
      where: {
        id: optionId,
      },
    });
  } catch (error) {
    console.error("error deleting option for checkbox question", error);
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/forms/nx/${formId}/edit`);
};
