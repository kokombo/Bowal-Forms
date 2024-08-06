"use client";

import Image, { type StaticImageData } from "next/image";

const FormBanner = ({ image }: { image: string | StaticImageData }) => {
  return (
    <div className="block relative w-full h-[220px] bg-green-800 rounded-lg">
      <Image
        src={image}
        alt=""
        fill
        sizes="any"
        className="object-cover rounded-lg"
        priority
      />
    </div>
  );
};

export default FormBanner;
