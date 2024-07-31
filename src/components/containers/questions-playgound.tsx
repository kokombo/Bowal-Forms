"use client";

import images from "@/lib/constants";
import Image from "next/image";
import { AnswerTypePlayground } from "./answer-type-playground";
import TitleAndDescriptionCombo from "./title-and-description-combo";
import { CreateNewQuestionButton } from "../ui/icon-buttons";
import { v4 as uuid } from "uuid";
import type { Question } from "@/types/my-types";

type QuestionsPlaygoundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const QuestionsPlaygound = ({ form, questions }: QuestionsPlaygoundProps) => {
  return (
    <section
      style={{ backgroundColor: form.theme?.backgroundColor as string }}
      className="flex justify-center pt-5 pb-20 relative min-h-screen"
    >
      <div className="w-11/12 lg:w-3/5 md:w-9/12 space-y-3">
        <div className="block relative w-full h-[220px] bg-green-800 rounded-lg">
          <Image
            src={images.hero}
            alt=""
            fill
            sizes="any"
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <TitleAndDescriptionCombo
          title={form.title}
          description={form.description}
          formId={form.id}
          ownerId={form.ownerId}
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

export default QuestionsPlaygound;
