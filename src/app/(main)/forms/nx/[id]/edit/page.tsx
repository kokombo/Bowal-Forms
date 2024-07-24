import FormEditNavbar from "@/components/containers/form-edit-navbar";
import { redirect } from "next/navigation";
import { getFormDetails } from "@/lib/get-form-details";

type Params = {
  id: string;
};

const EditForm = async ({ params }: { params: Params }) => {
  const form = await getFormDetails(params.id);

  if (!form) redirect("/forms");

  return (
    <main>
      <FormEditNavbar {...form} />
    </main>
  );
};

export default EditForm;
