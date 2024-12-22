import { formatLastOpened } from "../format-last-opened";
import { getServerSession } from "../getServerSession";
import prisma from "../prisma-connect";
import { unstable_cache as cache } from "next/cache";

/**
 * The function allows a user to get all of their forms
 */

export const getForms = cache(
  async () => {
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
    }
  },
  ["forms"],
  { revalidate: 3600, tags: ["forms"] }
);

/**
 * The function allows a user to get the details of a form
 */

export const getFormDetails = cache(
  async (formId: string) => {
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
    }
  },
  ["formDetails"],
  { revalidate: 3600, tags: ["formDetails"] }
);
