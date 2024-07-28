"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useServerAction } from "@/lib/use-server-actions";
import { updateFormTitle } from "@/actions";
import { MdDriveFileRenameOutline } from "react-icons/md";

type RenameFormDialogProps = {
  formId: string;
  previousTitle: string | null;
  ownerId: string;
};

const RenameFormDialog = ({
  formId,
  previousTitle,
  ownerId,
}: RenameFormDialogProps) => {
  const [newTitle, setNewTitle] = useState(previousTitle as string);
  const [runAction, isPending] = useServerAction(() =>
    updateFormTitle({ formId, title: newTitle.trim(), ownerId })
  );

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full justify-start">
        <Button variant="ghost" size="sm" className="outline-none">
          <MdDriveFileRenameOutline
            size={20}
            className="text-primarytext mr-2"
          />
          Rename
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>
            Please enter a new name for the form:
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" action={runAction}>
          <Input
            name="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="capitalize"
          />

          <div className="space-x-3 float-end">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                size="sm"
                type="submit"
                disabled={newTitle.length < 1 || isPending}
              >
                Rename
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFormDialog;
