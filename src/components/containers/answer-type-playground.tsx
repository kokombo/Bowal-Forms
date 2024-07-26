import { type ChangeEventHandler, useState } from "react";
import PlaygroundTextInput from "../ui/playground-text-input";
import { TextOption } from "./options";
import AnswerTypeSelect from "../selects/answer-type-select";

type AnswerTypePlaygroundProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required: boolean;
};

export const AnswerTypePlayground = ({
  value,
  onChange,
  required,
}: AnswerTypePlaygroundProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [answerType, setAnswerType] = useState("shortAnswer");

  const handleShowEditor = () => setShowEditor(true);
  const handleHideEditor = () => setShowEditor(false);

  return showEditor ? (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="w-3/5">
          <PlaygroundTextInput
            value={"Email"}
            size="small"
            onChange={onChange}
          />
        </div>

        <AnswerTypeSelect
          value={answerType}
          onValueChange={(value) => setAnswerType(value)}
        />
      </div>

      <div>
        {answerType === "shortAnswer" && (
          <TextOption placeholder="Short-answer text" />
        )}

        {answerType === "paragraph" && (
          <TextOption placeholder="Long-answer text" />
        )}
      </div>

      <div className="flex justify-end">
        <div>Tools</div>
      </div>
    </div>
  ) : (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <label className="text-black text-sm font-medium">
        {value} {required && <span className="text-red-600 text-base">*</span>}
      </label>

      <div>
        {answerType === "shortAnswer" && (
          <TextOption
            placeholder="Short-answer text"
            onClick={handleShowEditor}
          />
        )}

        {answerType === "paragraph" && (
          <TextOption
            placeholder="Long-answer text"
            onClick={handleShowEditor}
          />
        )}
      </div>
    </div>
  );
};
