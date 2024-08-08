"use client";

import type { Question } from "@/types/my-types";

type SettingsPlaygoundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const SettingsPlayground = ({ form, questions }: SettingsPlaygoundProps) => {
  return <div className="min-h-screen">SettingsPlayground</div>;
};

export default SettingsPlayground;
