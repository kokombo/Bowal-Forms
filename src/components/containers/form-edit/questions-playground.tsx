"use client";

import images from "@/lib/constants";
import { AnswerTypePlayground } from "./answer-type-playground";
import { CreateNewQuestionButton } from "@/components/ui/icon-buttons";
import { v4 as uuid } from "uuid";
import type { Question } from "@/types/my-types";
import TitleAndDescriptionCombo from "./title-and-description-combo";
import FormBanner from "../form-banner";

type QuestionsPlaygoundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const QuestionsPlayground = ({ form, questions }: QuestionsPlaygoundProps) => {
  return (
    <section className="flex justify-center pt-5 pb-20 relative min-h-screen">
      <div className="w-11/12 lg:w-3/5 md:w-9/12 space-y-3">
        <FormBanner image={images.hero} />

        <TitleAndDescriptionCombo
          title={form.title}
          description={form.description}
          formId={form.id}
        />

        <div className="flex flex-col gap-3">
          {questions?.map((question) => {
            return (
              <AnswerTypePlayground
                key={question.id}
                question={question}
                ownerId={form.ownerId}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed right-[3%] lg:right-[12%] bottom-5 lg:bottom-1/3 flex flex-col bg-white z-10 px-1 py-2 rounded-md shadow-md">
        <CreateNewQuestionButton
          questionId={uuid()}
          ownerId={form.ownerId}
          formId={form.id}
        />
      </div>
    </section>
  );
};

export default QuestionsPlayground;
