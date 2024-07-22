"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/components/ui/logo";
import { useSession } from "next-auth/react";

type AuthProps = {
  heading: string;
  callToAction: string;
};

const SigninPage = ({ heading, callToAction }: AuthProps) => {
  return (
    <main className="fixed flex lg:items-center justify-center pt-32 lg:py-12 h-screen w-full">
      <div className="absolute left-3 top-3">
        <Logo />
      </div>

      <div className="flex flex-col justify-between text-center border-1 rounded-lg px-4 py-6 w-5/6 lg:w-2/5 h-3/5 lg:h-4/5 shadow-sm">
        <h4 className="text-black text-xl lg:text-2xl font-medium">
          {heading}
        </h4>

        <div>
          <h5 className="text-primarytext">{callToAction} to Bowal Forms</h5>
        </div>

        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          size="lg"
          className="w-full"
        >
          <span className="mr-2 bg-white p-1 rounded-lg">
            <FcGoogle className="h-5 w-5" />
          </span>
          Continue with Google
        </Button>
      </div>
    </main>
  );
};

export default SigninPage;
