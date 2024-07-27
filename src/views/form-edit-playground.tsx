"use client";

import { useHash } from "@/lib/use-hash";
import ResponsesPlayground from "@/components/containers/responses-playground";
import QuestionsPlaygound from "@/components/containers/questions-playgound";
import SettingsPlayground from "@/components/containers/settings-playground";
import FormEditNavbar from "@/components/containers/form-edit-navbar";
import type { Question } from "@/types/my-types";

type FormEditPlaygroundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const FormEditPlayground = ({ form, questions }: FormEditPlaygroundProps) => {
  const hash = useHash();

  return (
    <main>
      <FormEditNavbar {...form} />
      {(!hash || hash === "") && (
        <QuestionsPlaygound form={form} questions={questions} />
      )}
      {hash === "#responses" && <ResponsesPlayground {...form} />}
      {hash === "#settings" && <SettingsPlayground {...form} />}
    </main>
  );
};

export default FormEditPlayground;
