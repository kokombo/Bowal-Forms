"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign In</AlertDialogTitle>
          <AlertDialogDescription>
            You are required to sign in to fill this form to ensure data
            integrity. We will not share your details with the form owner.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              type="button"
              onClick={() => signIn("google")}
              size="lg"
              className="w-full"
            >
              <span className="mr-2 bg-white p-1 rounded-lg">
                <FcGoogle className="h-5 w-5" />
              </span>
              Continue with Google
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignInDialog;
