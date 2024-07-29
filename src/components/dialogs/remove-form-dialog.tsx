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
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

  const handleDeleteForm = () => {
    deleteForm({ formId, ownerId }).then(() => {
      toast({
        description: "Form deleted successfully",
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full justify-start">
        <Button variant="ghost" size="sm" className="outline-none">
          <RiDeleteBin5Fill size={20} className="text-primarytext mr-2" />
          Remove
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
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
            <Button size="sm" onClick={handleDeleteForm}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFormDialog;
