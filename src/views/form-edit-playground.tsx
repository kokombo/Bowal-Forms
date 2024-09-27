"use client";

import { useHash } from "@/lib/use-hash";
import ResponsesPlayground from "@/components/containers/form-edit/responses-playground";
import QuestionsPlayground from "@/components/containers/form-edit/questions-playground";
import SettingsPlayground from "@/components/containers/form-edit/settings-playground";
import FormEditNavbar from "@/components/containers/form-edit/form-edit-navbar";
import type { Form, Question } from "@/types/my-types";

type FormEditPlaygroundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const FormEditPlayground = ({ form, questions }: FormEditPlaygroundProps) => {
  const hash = useHash();

  return (
    <div style={{ backgroundColor: form.theme?.backgroundColor ?? "white" }}>
      <FormEditNavbar {...form} />
      {(!hash || hash === "") && (
        <QuestionsPlayground form={form} questions={questions} />
      )}
      {hash === "#responses" && (
        <ResponsesPlayground form={form} questions={questions} />
      )}
      {hash === "#settings" && (
        <SettingsPlayground form={form} questions={questions} />
      )}
    </div>
  );
};

export default FormEditPlayground;
