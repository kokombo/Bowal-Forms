"use client";

import images from "@/lib/constants";
import Image from "next/image";
import { FaFileWaveform } from "react-icons/fa6";
import { TbDotsVertical } from "react-icons/tb";
import { Fragment, useCallback } from "react";
import { openRecentForm } from "@/actions";
import { useServerAction } from "@/lib/use-server-actions";
import { DotLoader } from "@/components/loaders/loaders";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { useFormatLastOpened } from "@/lib/use-format-last-opened";
import { sliceString } from "@/lib/slice-string";
import RenameFormDialog from "../dialogs/rename-form-dialog";
import RemoveFormDialog from "../dialogs/remove-form-dialog";
import type { Form } from "@prisma/client";

const RecentForm = ({ form }: { form: Form }) => {
  const [handleOpenForm, isPending] = useServerAction(() =>
    openRecentForm({ formId: form.id, ownerId: form.ownerId })
  );
  // const formattedLastOpened = useFormatLastOpened(form.lastOpened);

  return (
    <Fragment>
      {isPending && <DotLoader />}

      <div
        onClick={handleOpenForm}
        onKeyDown={() => {}}
        className="flex flex-col items-start rounded-sm lg:min-w-56  border-1 hover:border-purple-800 cursor-pointer"
      >
        <div className="block relative h-[185px] w-full">
          <Image
            src={images.hero}
            alt=""
            fill
            sizes="100vw 50vw 30vw"
            className="rounded-t-sm object-contain"
          />
        </div>

        <div className="flex flex-col items-start gap-2 py-3 px-3 lg:px-4 border-t-1 w-full">
          <h5 className="text-xs lg:text-sm font-medium text-black">
            {sliceString(form.title, 25)}
          </h5>

          <div className="flex justify-between w-full">
            <span className="flex items-center gap-1 lg:gap-2">
              <FaFileWaveform size={22} color="green" />
              <h6 className="text-xs font-medium text-primarytext">
                {/* Opened {formattedLastOpened} */}
              </h6>
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-[100%] p-2"
                >
                  <TbDotsVertical size={20} className="text-primarytext" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                onClick={(e) => e.stopPropagation()}
                className="w-56 lg:w-72"
              >
                <ul>
                  <li>
                    <RenameFormDialog
                      formId={form.id}
                      previousTitle={form.title}
                    />
                  </li>

                  <li>
                    <RemoveFormDialog
                      formId={form.id}
                      title={form.title}
                      ownerId={form.ownerId}
                    />
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecentForm;
