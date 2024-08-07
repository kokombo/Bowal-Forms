"use client";

import type { $Enums } from "@prisma/client";
import { Fragment } from "react";

const OptionIcon = ({
  type,
  index,
}: {
  type: $Enums.QUESTION_TYPE | null;
  index: number;
}) => {
  return (
    <Fragment>
      {type === "CHECKBOXES" && (
        <input type="checkbox" disabled className="h-5 w-5" />
      )}

      {type === "MULTIPLE_CHOICE" && (
        <input type="radio" disabled className="h-5 w-5" />
      )}

      {type === "DROP_DOWN" && (
        <h5 className="w-5 text-primarytext">{index + 1}.</h5>
      )}
    </Fragment>
  );
};

export default OptionIcon;
