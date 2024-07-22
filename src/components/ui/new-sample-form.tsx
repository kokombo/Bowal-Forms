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
        className="block relative h-[150px] w-full bg-white rounded-sm"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="80vw 50vw 30vw"
          className="border-1 hover:border-purple-800 rounded-sm object-contain"
        />
      </button>

      <figcaption className="text-black text-xs font-medium capitalize lg:text-sm mt-2">
        {caption}
      </figcaption>
    </article>
  );
};

export default NewSampleForm;
