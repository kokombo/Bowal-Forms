import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";
import { getForms } from "@/lib/get-requests/form";
import { getServerSession } from "@/lib/getServerSession";

const Forms = async () => {
  const getSession = getServerSession();
  const formsData = getForms();

  const [session, forms] = await Promise.all([getSession, formsData]);

  return (
    <div>
      <FormsNavbar session={session} />
      <StartNewForm />
      <RecentForms recentForms={forms} />
    </div>
  );
};

export default Forms;
