import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";
import { getServerSession } from "@/lib/getServerSession";

const Forms = async () => {
  const session = await getServerSession();

  return (
    <main>
      <FormsNavbar session={session} />
      <StartNewForm />
      <RecentForms />
    </main>
  );
};

export default Forms;
