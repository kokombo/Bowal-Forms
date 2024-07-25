"use client";

import { useHash } from "@/lib/use-hash";
import ResponsesPlayground from "./responses-playground";
import QuestionsPlaygound from "./questions-playgound";
import SettingsPlayground from "./settings-playground";

const FormEditPlayground = (form: Form) => {
  const hash = useHash();

  return (
    <main>
      {hash === "" && <QuestionsPlaygound />}
      {hash === "#responses" && <ResponsesPlayground />}
      {hash === "#settings" && <SettingsPlayground />}
    </main>
  );
};

export default FormEditPlayground;
