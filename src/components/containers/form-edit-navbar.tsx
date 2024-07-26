"use client";

import React from "react";
import { FaFileWaveform } from "react-icons/fa6";
import EditFormTitleInput from "../ui/edit-form-title-input";
import Link from "next/link";

const FormEditNavbar = (form: Form) => {
  return (
    <nav className="sticky left-0 top-0 bg-white z-10 md:px-4 py-4 space-y-6">
      <div>
        <div className="flex items-center gap-1 w-fit">
          <FaFileWaveform size={36} color="green" />

          <EditFormTitleInput {...form} />
        </div>

        <div />
      </div>

      <div className="flex w-full justify-center">
        <ul className="flex gap-2">
          <li>
            <Link href="">Questions</Link>
          </li>
          <li>
            <Link href="#responses">Responses</Link>
          </li>
          <li>
            <Link href="#settings">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FormEditNavbar;
