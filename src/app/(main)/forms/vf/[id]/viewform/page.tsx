import { getFormDetails } from "@/lib/get-requests/form";
import { getQuestions } from "@/lib/get-requests/question";
import FormSubmitPlayground from "@/views/form-submit-playground";
import { notFound } from "next/navigation";

type Params = {
  id: string;
};

const ViewFormPlayground = async ({ params }: { params: Params }) => {
  const form = await getFormDetails(params.id);

  if (!form) notFound();

  const questions = await getQuestions(form.id);

  return <FormSubmitPlayground form={form} questions={questions} />;
};

export default ViewFormPlayground;
