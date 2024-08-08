import { redirect } from "next/navigation";
import { getFormDetails } from "@/lib/get-requests/form";
import FormEditPlayground from "@/views/form-edit-playground";
import { getQuestions } from "@/lib/get-requests/question";
import { getServerSession } from "@/lib/getServerSession";

type Params = {
  id: string;
};

const EditForm = async ({ params }: { params: Params }) => {
  const getSession = getServerSession();
  const getForm = getFormDetails(params.id);

  const [session, form] = await Promise.all([getSession, getForm]);

  if (!form) redirect("/forms");
  if (form.ownerId !== session?.user.id) redirect("/");

  const questions = await getQuestions(form.id);

  return <FormEditPlayground form={form} questions={questions} />;
};

export default EditForm;
