import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";
import { getForms } from "@/lib/get-forms";
import { getServerSession } from "@/lib/getServerSession";

const Forms = async () => {
  const getSession = getServerSession();
  const formsData = getForms();

  const [session, forms] = await Promise.all([getSession, formsData]);

  return (
    <main>
      <FormsNavbar session={session} />
      <StartNewForm />
      <RecentForms recentForms={forms} />
    </main>
  );
};

export default Forms;
