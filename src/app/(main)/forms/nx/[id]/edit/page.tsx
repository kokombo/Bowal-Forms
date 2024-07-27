import { redirect } from "next/navigation";
import { getFormDetails } from "@/lib/get-requests/form";
import FormEditPlayground from "@/components/containers/form-edit-playground";

type Params = {
  id: string;
};

const EditForm = async ({ params }: { params: Params }) => {
  const form = await getFormDetails(params.id);
  if (!form) redirect("/forms");

  return <FormEditPlayground {...form} />;
};

export default EditForm;
