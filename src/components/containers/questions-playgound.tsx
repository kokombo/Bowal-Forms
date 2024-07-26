"use client";

import images from "@/constants";
import Image from "next/image";
import PlaygroundTextInput from "../ui/playground-text-input";
import ShortAnswerTextInput from "../ui/short-answer-text-input";
import { AnswerTypePlayground } from "./answer-type-playground";

const QuestionsPlaygound = ({ theme, title, description }: Form) => {
  return (
    <section
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className="flex justify-center py-3 min-h-screen"
    >
      <div className="lg:w-3/5 space-y-3">
        <div className="block relative w-full h-[220px] bg-green-800 rounded-lg">
          <Image
            src={images.hero}
            alt=""
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
          <PlaygroundTextInput
            value={title}
            size="large"
            placeholder="Form title"
            onChange={() => {}}
          />
          <PlaygroundTextInput
            value={description}
            size="small"
            placeholder="Form description"
            onChange={() => {}}
          />
        </div>

        <AnswerTypePlayground value="" onChange={() => {}} required />
      </div>
    </section>
  );
};

export default QuestionsPlaygound;
