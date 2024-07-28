type Form = {
  id: string;
  title: string | null;
  description: string | null;
  shareableURL: string | null;
  ownerId: string;
  image: string | null;
  lastOpened: Date;
  theme: Theme | null;
  createdAt: Date;
};

type Theme = {
  id: string;
  headerImage: string | null;
  backgroundColor: string | null;
  formId: string;
};

type Option = {
  id: string;
  label: string;
  value: string;
  questionId: string;
};

type Response = {
  id: string;
};
