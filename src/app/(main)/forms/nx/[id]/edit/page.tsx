import { redirect } from "next/navigation";
import { getFormDetails } from "@/lib/get-requests/form";
import FormEditPlayground from "@/views/form-edit-playground";
import { getQuestions } from "@/lib/get-requests/question";

type Params = {
  id: string;
};

const EditForm = async ({ params }: { params: Params }) => {
  const form = await getFormDetails(params.id);

  if (!form) redirect("/forms");

  const questions = await getQuestions(form.id);

  return <FormEditPlayground form={form} questions={questions} />;
};

export default EditForm;
