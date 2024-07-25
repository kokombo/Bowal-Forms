"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/components/ui/logo";
import { AuthScreenIcon } from "@/lib/icons";
import AuthFooterCTA from "@/components/ui/auth-footer-cta";
import { usePathname } from "next/navigation";

type AuthProps = {
  heading: string;
  callToAction: string;
};

const SigninPage = ({ heading, callToAction }: AuthProps) => {
  const pathname = usePathname();

  return (
    <main className="fixed flex lg:items-center justify-center pt-32 lg:py-12 h-screen w-full">
      <div className="absolute left-3 top-3">
        <Logo />
      </div>

      <div className="flex flex-col justify-between text-center border-1 rounded-lg px-4 py-6 w-11/12 sm:w-3/5 md:w-1/2 lg:w-2/5 h-3/5 sm:h-4/5 shadow-sm">
        <h4 className="text-black text-xl lg:text-2xl font-medium">
          {heading}
        </h4>

        <div className="flex flex-col items-center gap-5">
          <h5 className="text-primarytext">{callToAction} to Bowal Forms</h5>
          <AuthScreenIcon />
        </div>

        <div>
          <Button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/forms" })}
            size="lg"
            className="w-full"
          >
            <span className="mr-2 bg-white p-1 rounded-lg">
              <FcGoogle className="h-5 w-5" />
            </span>
            Continue with Google
          </Button>

          <div className="mt-2">
            {pathname === "/sign-in" && (
              <AuthFooterCTA
                text="Don't have an account yet?"
                ctaLabel="Sign up"
                href="/sign-up"
              />
            )}

            {pathname === "/sign-up" && (
              <AuthFooterCTA
                text="Already have an account?"
                ctaLabel="Sign in"
                href="/sign-in"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SigninPage;
