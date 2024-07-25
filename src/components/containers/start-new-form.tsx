"use client";

import images from "@/constants";
import NewSampleForm from "../ui/new-sample-form";

const newFormSample = [
  { image: images.hero, caption: "Blank Form" },
  { image: images.hero, caption: "Contact Information" },
  { image: images.hero, caption: "RSVP" },
  { image: images.hero, caption: "Party Invite" },
  { image: images.hero, caption: "T-Shirt Sign Up" },
];

const StartNewForm = () => {
  return (
    <section className="bg-grey flex justify-center flex-col gap-5 py-10 px-6 sm:px-20 md:px-14 xl:px-40">
      <h5 className="self-start text-black">Start a new form</h5>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 lg:gap-x-5">
        {newFormSample.map((formSample, index) => {
          return <NewSampleForm key={index.toString()} {...formSample} />;
        })}
      </div>
    </section>
  );
};

export default StartNewForm;
