"use client";

import { FaFileWaveform } from "react-icons/fa6";
import EditFormTitleInput from "../ui/edit-form-title-input";
import Link from "next/link";
import ProfilePicture from "../ui/profile-picture";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { TbDotsVertical } from "react-icons/tb";
import FormEditTabs from "./form-edit-tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteForm } from "@/actions";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const FormEditNavbar = (form: Form) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteForm = () => {
    deleteForm({ formId: form.id, ownerId: form.ownerId }).then(() => {
      router.push("/forms");
      toast({
        description: "Form deleted successfully",
      });
    });
  };

  return (
    <nav className="sticky left-0 top-0 bg-white z-10 px-1 md:px-4 pt-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/forms">
            <FaFileWaveform size={36} color="green" />
          </Link>

          <EditFormTitleInput {...form} />
        </div>

        <div className="flex items-center gap-1 lg:gap-2">
          <Button size="sm">Preview</Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <TbDotsVertical size={20} className="text-primarytext" />
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <ul>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleDeleteForm}
                  >
                    <RiDeleteBin5Fill
                      size={20}
                      className="text-primarytext mr-2"
                    />
                    Move to bin
                  </Button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>

          <ProfilePicture picture={session?.user.image} />
        </div>
      </div>

      <div className="flex w-full justify-center">
        <FormEditTabs />
      </div>
    </nav>
  );
};

export default FormEditNavbar;
