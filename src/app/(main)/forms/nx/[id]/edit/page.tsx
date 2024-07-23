import FormEditNavbar from "@/components/containers/form-edit-navbar";

type Params = {
  id: string;
};

const EditForm = ({ params }: { params: Params }) => {
  return (
    <main>
      <FormEditNavbar />
    </main>
  );
};

export default EditForm;
