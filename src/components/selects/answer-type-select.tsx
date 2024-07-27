import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type AnswerTypeSeletProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const AnswerTypeSelect = ({ value, onValueChange }: AnswerTypeSeletProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue defaultValue="SHORT_ANSWER" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="SHORT_ANSWER">Short answer</SelectItem>
          <SelectItem value="PARAGRAPH">Paragraph</SelectItem>
          <SelectItem value="MULTIPLE_CHOICE">Multiple choice</SelectItem>
          <SelectItem value="CHECKBOXES">Checkboxes</SelectItem>
          <SelectItem value="DROP_DOWN">Dropdown</SelectItem>
          <SelectItem value="DATE">Date</SelectItem>
          <SelectItem value="TIME">Time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AnswerTypeSelect;
