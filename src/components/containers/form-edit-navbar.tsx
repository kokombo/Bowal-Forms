"use client";

import React from "react";
import { FaFileWaveform } from "react-icons/fa6";
import EditFormTitleInput from "../ui/edit-form-title-input";

const FormEditNavbar = (form: Form) => {
  return (
    <div className="sticky left-0 top-0 bg-white z-10 flex items-center justify-between md:px-2 py-3">
      <nav>
        <div className="flex items-center gap-1 w-fit">
          <FaFileWaveform size={36} color="green" />

          <EditFormTitleInput {...form} />
        </div>
      </nav>
    </div>
  );
};

export default FormEditNavbar;
