import FormsNavbar from "@/components/containers/forms-navbar";
import RecentForms from "@/components/containers/recent-forms";
import StartNewForm from "@/components/containers/start-new-form";

const Forms = () => {
  return (
    <main>
      <FormsNavbar />
      <StartNewForm />
      <RecentForms />
    </main>
  );
};

export default Forms;
