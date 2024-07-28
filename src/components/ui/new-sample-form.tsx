"use client";

import { startANewForm } from "@/actions";
import Image, { type StaticImageData } from "next/image";
import { v4 as uuid } from "uuid";
import { useServerAction } from "@/lib/use-server-actions";
import { Fragment } from "react";
import DotLoader from "../loaders/dot-loader";

type NewSampleFormProps = {
  image: string | StaticImageData;
  caption: string;
  theme: {
    headerImage: string;
    backgroundColor: string;
  };
};

const NewSampleForm = ({ image, caption, theme }: NewSampleFormProps) => {
  const [createANewForm, formIsPending] = useServerAction(startANewForm);

  const createANewFormFromSampleTheme = async () => {
    await createANewForm({
      formId: uuid(),
      title: caption,
      backgroundColor: theme.backgroundColor,
      headerImage: theme.headerImage,
    });
  };

  return (
    <Fragment>
      {formIsPending && <DotLoader />}

      <article>
        <button
          type="button"
          className="block relative h-[150px] w-full bg-white rounded-sm"
          onClick={createANewFormFromSampleTheme}
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
    </Fragment>
  );
};

export default NewSampleForm;
