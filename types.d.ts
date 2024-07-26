type Form = {
  id: string;
  title: string | null;
  description: string | null;
  shareableURL: string | null;
  ownerId: string;
  image: string | null;
  lastOpened: Date;
  theme: Theme | null;
  questions?: Question[];
  responses?: Response[];
  createdAt: Date;
};

type Theme = {
  id: string;
  headerImage: string | null;
  backgroundColor: string | null;
  formId: string;
};

type Question = {
  id: string;
  title: string | null;
  type: string | null;
  required: boolean | null;
  longAnswerText: string | null;
  shortAnswerText: string | null;
  multiChoiceOptions: string[];
  checkboxesOptions: string[];
  dropDownOptions: string[];
  date: Date | null;
  time: Date | null;
};

type Response = {
  id: string;
};

type MultipleChoiceOption = {
  id: string;
  label: string;
  value: string;
};
