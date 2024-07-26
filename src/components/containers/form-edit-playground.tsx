"use client";

import { useHash } from "@/lib/use-hash";
import ResponsesPlayground from "./responses-playground";
import QuestionsPlaygound from "./questions-playgound";
import SettingsPlayground from "./settings-playground";
import FormEditNavbar from "./form-edit-navbar";

const FormEditPlayground = (form: Form) => {
  const hash = useHash();

  return (
    <main>
      <FormEditNavbar {...form} />
      {hash === "" && <QuestionsPlaygound {...form} />}
      {hash === "#responses" && <ResponsesPlayground {...form} />}
      {hash === "#settings" && <SettingsPlayground {...form} />}
    </main>
  );
};

export default FormEditPlayground;
