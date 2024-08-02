"use client";

import { useState, useCallback, memo } from "react";
import PlaygroundTextInput from "../ui/playground-text-input";
import { updateFormDescription, updateFormTitle } from "@/actions";

type TitleAndDescriptionComboProp = {
  title: string | null;
  description: string | null;
  formId: string;
  ownerId: string;
};

const TitleAndDescriptionCombo = ({
  title,
  description,
  formId,
  ownerId,
}: TitleAndDescriptionComboProp) => {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDescription, setNewDescription] = useState(description || "");

  const handleUpdateTitle = useCallback(async () => {
    if (title?.trim() === newTitle.trim()) return;
    await updateFormTitle({ formId, ownerId, title: newTitle });
  }, [formId, ownerId, title, newTitle]);

  const handleUpdateDescription = useCallback(async () => {
    if (description?.trim() === newDescription.trim()) return;
    await updateFormDescription({
      formId,
      ownerId,
      description: newDescription,
    });
  }, [formId, ownerId, description, newDescription]);

  return (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <PlaygroundTextInput
        name="title"
        value={newTitle}
        size="large"
        placeholder="Form title"
        onInputChange={(e) => setNewTitle(e.target.value)}
        onInputBlur={handleUpdateTitle}
      />

      <PlaygroundTextInput
        name="description"
        value={newDescription}
        size="small"
        placeholder="Form description"
        onInputChange={(e) => setNewDescription(e.target.value)}
        onInputBlur={handleUpdateDescription}
      />
    </div>
  );
};

export default memo(TitleAndDescriptionCombo);
