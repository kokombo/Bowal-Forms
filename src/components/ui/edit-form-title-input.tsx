"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { updateFormTitle } from "@/actions";

const EditFormTitleInput = ({
  title: currentTitle,
  id: formId,
  ownerId,
}: Form) => {
  const [showOutline, setShowOutline] = useState(false);
  const [title, setTitle] = useState(currentTitle || "");
  const titleRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (titleRef.current && spanRef.current) {
      spanRef.current.textContent = title;
      const spanWidth = spanRef.current.offsetWidth;
      titleRef.current.style.width = `${spanWidth}px`;
    }
  }, [title]);

  const handleInputBlur = useCallback(async () => {
    setShowOutline(false);
    if (title.replace(/\s+/g, "").length < 1) setTitle(currentTitle || "");
    await updateFormTitle({ formId, title: title.trim(), ownerId });
  }, [title, ownerId, currentTitle, formId]);

  return (
    <div className="relative">
      <input
        name="title"
        type="text"
        value={title}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowOutline(true)}
        onMouseEnter={() => setShowOutline(true)}
        onMouseLeave={() => setShowOutline(false)}
        onBlur={handleInputBlur}
        className="outline-none"
      />
      <span ref={spanRef} className="absolute invisible whitespace-pre" />

      {showOutline && (
        <hr
          className={"h-[3px] bg-black absolute left-0 -bottom-[2px] w-full"}
        />
      )}
    </div>
  );
};

export default EditFormTitleInput;
