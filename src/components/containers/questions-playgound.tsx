"use client";

import images from "@/constants";
import Image from "next/image";
import PlaygroundTextInput from "../ui/playground-text-input";
import { AnswerTypePlayground } from "./answer-type-playground";
import TitleAndDescriptionCombo from "./title-and-description-combo";

const QuestionsPlaygound = ({
  theme,
  title,
  description,
  id,
  ownerId,
}: Form) => {
  return (
    <section
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className="flex justify-center py-3 min-h-screen"
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
        <AnswerTypePlayground value="" required />
        <AnswerTypePlayground value="" required />
        <AnswerTypePlayground value="" required />
      </div>
    </section>
  );
};

export default QuestionsPlaygound;
