"use client";

import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import { memo } from "react";

type LandingSectionProp = {
  heading: string;
  paragraph: string;
  image: string | StaticImageData;
  className?: string;
};

const LandingSection = memo(function LandingSecton({
  heading,
  paragraph,
  image,
  className,
}: LandingSectionProp) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-5 lg:gap-12 px-6 lg:px-16 py-10 lg:py-20",
        className
      )}
    >
      <div className="space-y-6">
        <h2 className="text-2xl lg:text-4xl text-black font-medium">
          {heading}
        </h2>

        <p className="text-primarytext leading-7 lg:text-lg lg:leading-8">
          {paragraph}
        </p>
      </div>

      <div>
        <Image
          src={image}
          alt={heading.substring(0, 30)}
          quality={100}
          priority
          sizes="100vw"
          className="object-contain shadow-xl rounded-xl"
        />
      </div>
    </section>
  );
});

export default LandingSection;
