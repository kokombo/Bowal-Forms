import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";
import { formatLastOpened } from "@/lib/format-last-opened";
import { getForms } from "@/lib/get-requests/form";
import { getServerSession } from "@/lib/getServerSession";

const Forms = async () => {
  const getSession = getServerSession();
  const formsData = getForms();

  const [session, forms] = await Promise.all([getSession, formsData]);

  const formattedForms = forms?.map((form) => ({
    ...form,
    lastOpened: formatLastOpened(form.lastOpened),
  }));

  return (
    <main>
      <FormsNavbar session={session} />
      <StartNewForm />
      <RecentForms recentForms={formattedForms} />
    </main>
  );
};

export default Forms;
