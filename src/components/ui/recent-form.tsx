"use client";

import Image, { type StaticImageData } from "next/image";

type RecentFormProps = {
  image: string | StaticImageData;
  caption: string;
  lastOpened: string;
};

const RecentForm = ({ image, caption, lastOpened }: RecentFormProps) => {
  return (
    <article>
      <div>
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="border-1 hover:border-purple-800 rounded-sm object-contain"
        />
      </div>

      <div>AA</div>
    </article>
  );
};

export default RecentForm;
