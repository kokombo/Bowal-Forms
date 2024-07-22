"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import images from "@/constants";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col items-center text-center gap-6 lg:gap-9 px-6 lg:px-16 py-14 lg:py-24">
      <h1 className="text-3xl lg:text-6xl text-black font-medium">
        Get Insights Quickly, With Bowal Forms
      </h1>

      <h2 className="text-primarytext lg:text-lg font-medium leading-7 lg:leading-8">
        Easily create and share online forms and surveys, and analyze responses
        in real-time.
      </h2>

      <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-5">
        <Link
          href=""
          className={cn(buttonVariants({ size: "lg" }), "w-52 lg:w-auto")}
        >
          Try Forms for Work
        </Link>

        <Link
          href={session ? "/" : "/sign-in"}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "text-blue w-52 lg:w-auto"
          )}
        >
          Go to Forms
        </Link>
      </div>

      <div className="flex flex-col items-center lg:flex-row gap-y-3 lg:gap-x-1">
        <h3 className="text-primarytext">Don&apos;t have an account?</h3>

        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "text-blue"
          )}
        >
          Sign up for free
        </Link>
      </div>

      <div className="block relative h-[300px] w-[400px] md:h-[400px] md:w-[600px] lg:h-[500px] lg:w-[700px] max-w-[90vw] ">
        <Image
          src={images.hero}
          alt="hero-image"
          fill
          quality={100}
          priority
          className="object-contain shadow-xl rounded-xl"
        />
      </div>
    </header>
  );
};

export default Hero;
