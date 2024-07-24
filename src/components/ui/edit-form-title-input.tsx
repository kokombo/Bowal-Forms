"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { updateFormTitle } from "@/actions";

const EditFormTitleInput = ({
  currentTitle,
  formId,
}: {
  currentTitle: string | null;
  formId: string;
}) => {
  const [showEditableInputStyle, setShowEditableInputStyle] = useState(false);
  const [title, setTitle] = useState(currentTitle as string);
  const titleRef = useRef<null | HTMLInputElement>(null);
  const spanRef = useRef<null | HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (titleRef.current && spanRef.current) {
      spanRef.current.textContent = title || " ";
      const spanWidth = spanRef.current.offsetWidth;
      titleRef.current.style.width = `${spanWidth}px`;
    }
  }, [title]);

  return (
    <div className="relative">
      <input
        name="title"
        type="text"
        value={title}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowEditableInputStyle(true)}
        onBlur={async () => {
          setShowEditableInputStyle(false);
          await updateFormTitle({ formId, title });
        }}
        className="outline-none"
      />
      <span ref={spanRef} className="absolute invisible whitespace-pre" />

      {showEditableInputStyle && (
        <hr
          className={"h-[3px] bg-black absolute left-0 -bottom-[2px] w-full"}
        />
      )}
    </div>
  );
};

export default EditFormTitleInput;
