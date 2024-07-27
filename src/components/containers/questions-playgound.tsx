"use client";

import images from "@/constants";
import Image from "next/image";
import { AnswerTypePlayground } from "./answer-type-playground";
import TitleAndDescriptionCombo from "./title-and-description-combo";
import { CreateNewQuestionButton } from "../ui/icon-buttons";
import { v4 as uuid } from "uuid";

const QuestionsPlaygound = ({
  theme,
  title,
  description,
  id,
  ownerId,
  questions,
}: Form) => {
  const questionId = uuid();

  return (
    <section
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className="flex justify-center pt-5 pb-20 min-h-screen relative"
    >
      <div className="w-11/12 lg:w-3/5 md:w-9/12 space-y-3">
        <div className="block relative w-full h-[220px] bg-green-800 rounded-lg">
          <Image
            src={images.hero}
            alt=""
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <TitleAndDescriptionCombo
          title={title}
          description={description}
          formId={id}
          ownerId={ownerId}
        />

        <div className="flex flex-col gap-3">
          {questions?.map((question) => {
            return (
              <AnswerTypePlayground
                key={question.id}
                question={question}
                ownerId={ownerId}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute right-[3%] lg:right-[12%] top-1/2 flex flex-col bg-white px-1 py-2 rounded-md shadow-md">
        <CreateNewQuestionButton
          questionId={questionId}
          ownerId={ownerId}
          formId={id}
        />
      </div>
    </section>
  );
};

export default QuestionsPlaygound;
