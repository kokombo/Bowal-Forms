"use client";

import images from "@/constants";
import Image from "next/image";

const newFormSample = [
  { image: images.hero, caption: "Blank Form" },
  { image: images.hero, caption: "Contact Information" },
  { image: images.hero, caption: "RSVP" },
  { image: images.hero, caption: "Party Invite" },
  { image: images.hero, caption: "T-Shirt Sign Up" },
];

const StartNewForm = () => {
  return (
    <section className="bg-grey flex justify-center flex-col gap-5 py-10 px-6 lg:px-32">
      <h5 className="self-start text-black">Start a new form</h5>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 lg:gap-x-5">
        {newFormSample.map((formSample, index) => {
          return (
            <article key={index.toString()}>
              <button
                type="button"
                className="block relative h-[140px] w-full bg-white rounded-sm"
              >
                <Image
                  src={formSample.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="border-1 hover:border-purple-800 rounded-sm object-contain"
                />
              </button>

              <figcaption className="text-xs font-semibold mt-2">
                {formSample.caption}
              </figcaption>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default StartNewForm;
