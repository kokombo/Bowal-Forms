import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";
import { getForms } from "@/lib/get-requests/form";
import { getServerSession } from "@/lib/getServerSession";

const Forms = async () => {
  const getSession = await getServerSession();
  const formsData = await getForms();

  const [session, forms] = await Promise.all([getSession, formsData]);

  return (
    <main>
      <FormsNavbar session={session} />
      <StartNewForm />
      {forms && <RecentForms recentForms={forms} />}
    </main>
  );
};

export default Forms;
