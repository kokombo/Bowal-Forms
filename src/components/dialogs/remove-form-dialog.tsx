"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteForm } from "@/actions";
import { useServerAction } from "@/lib/use-server-actions";

type RemoveFormDialogProps = {
  formId: string;
  title: string | null;
  ownerId: string;
};

const RemoveFormDialog = ({
  formId,
  title,
  ownerId,
}: RemoveFormDialogProps) => {
  const [runAction, isPending] = useServerAction(() =>
    deleteForm({ formId, ownerId })
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Trash &quot;{title}&quot; </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to perform action?. This will permanently
            delete your form data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button size="sm" onClick={runAction} disabled={isPending}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFormDialog;
