import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
        <SelectValue defaultValue="shortAnswer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="shortAnswer">Short answer</SelectItem>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="multipleChoice">Multiple choice</SelectItem>
          <SelectItem value="checkboxes">Checkboxes</SelectItem>
          <SelectItem value="dropdown">Dropdown</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="time">Time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AnswerTypeSelect;
