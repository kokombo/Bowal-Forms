"use client";

import Image, { type StaticImageData } from "next/image";

type NewSampleFormProps = {
  image: string | StaticImageData;
  caption: string;
};

const NewSampleForm = ({ image, caption }: NewSampleFormProps) => {
  return (
    <article>
      <button
        type="button"
        className="block relative h-[140px] w-full bg-white rounded-sm"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="border-1 hover:border-purple-800 rounded-sm object-contain"
        />
      </button>

      <figcaption className="text-xs lg:text-sm mt-2">{caption}</figcaption>
    </article>
  );
};

export default NewSampleForm;
