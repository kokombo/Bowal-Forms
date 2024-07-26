import { useState, type MouseEventHandler } from "react";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import RadioGroupItem from "../ui/radio-group-item";

export const TextOption = ({
  placeholder,
  onClick,
}: {
  placeholder: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      className="outline-none font-medium px-1 text-sm py-1 w-full border-b-1 bg-white text-gray-400"
    >
      {placeholder}
    </div>
  );
};

export const MultipleChoiceOptions = ({
  optionsData,
}: {
  optionsData: MultipleChoiceOption[];
}) => {
  const [data, setData] = useState(optionsData);

  return (
    <RadioGroup
      defaultValue=""
      className="flex flex-col gap-6 py-2 items-start"
    >
      {data.map((item, index) => {
        return (
          <div key={index.toString()} className="flex items-center space-x-2">
            <RadioGroupItem
              value={item.value}
              optionId={item.id}
              id={item.label}
              setData={setData}
              data={data}
            />

            <Label htmlFor={item.label} />
          </div>
        );
      })}

      <Button
        variant="link"
        size="sm"
        onClick={() =>
          setData((data) => [
            ...data,
            { id: "2", label: "Add option", value: "Add option" },
          ])
        }
      >
        Add Another
      </Button>
    </RadioGroup>
  );
};
