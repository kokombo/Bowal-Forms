"use client";

import { useSession } from "next-auth/react";
import { RiMailCloseLine } from "react-icons/ri";

const FormInfo = ({ title }: { title: string | null }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-white py-5 rounded-lg shadow-sm border-1 flex flex-col gap-4">
      <h2 className="text-black text-3xl px-6 tracking-wide">{title ?? ""}</h2>

      <hr />

      <span className="text-primarytext text-sm px-6 tracking-wide space-y-2">
        <p className="font-semibold ">{session?.user.email}</p>

        <span className="flex items-center gap-2">
          <RiMailCloseLine size={24} /> Not shared
        </span>
      </span>

      <hr />

      <span className="text-red-500 font-medium text-sm px-6">
        * Indicates required field
      </span>
    </div>
  );
};

export default FormInfo;
