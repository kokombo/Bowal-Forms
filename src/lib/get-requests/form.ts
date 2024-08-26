import { formatLastOpened } from "../format-last-opened";
import { getServerSession } from "../getServerSession";
import { prisma } from "../prisma-connect";
import { cache } from "react";

/**
 * The function allows a user to get all of their forms
 */

export const getForms = async () => {
  const session = await getServerSession();

  try {
    const forms = await prisma.form.findMany({
      where: {
        ownerId: session?.user.id,
      },
      orderBy: {
        lastOpened: "desc",
      },
    });

    const formattedForms = forms.map((form) => ({
      ...form,
      lastOpened: formatLastOpened(form.lastOpened),
    }));

    return formattedForms;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * The function allows a user to get the details of a form
 */

export const getFormDetails = cache(async (formId: string) => {
  try {
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        theme: true,
      },
    });

    return form;
  } catch (error) {
    console.error("error getting form details", error);
  } finally {
    await prisma.$disconnect();
  }
});
