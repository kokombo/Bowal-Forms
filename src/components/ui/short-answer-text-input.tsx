import type { ChangeEventHandler } from "react";
import PlaygroundTextInput from "./playground-text-input";

type ShortAnswerTextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  label: string;
  required: boolean;
  id: string;
  disabled?: boolean;
};

const ShortAnswerTextInput = ({
  onChange,
  value,
  label,
  required,
  id,
  disabled,
}: ShortAnswerTextInputProps) => {
  return (
    <div className="bg-white py-10 px-5 space-y-3 rounded-lg shadow-md">
      <label htmlFor={id} className="text-black text-sm font-medium">
        {label} {required && <span className="text-red-600 text-base">*</span>}
      </label>

      <PlaygroundTextInput
        value={value}
        size="small"
        placeholder="Short-answer text"
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ShortAnswerTextInput;
