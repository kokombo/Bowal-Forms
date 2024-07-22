"use client";

import images from "@/constants";
import RecentForm from "../ui/recent-form";

const recentForms = [
  { image: images.hero, caption: "Bheuda Waitlist Form", lastOpened: "10:11" },
  { image: images.hero, caption: "Contact Information", lastOpened: "10:11" },
  { image: images.hero, caption: "Bheuda Waitlist Form", lastOpened: "10:11" },
  { image: images.hero, caption: "Bheuda Waitlist Form", lastOpened: "10:11" },
  { image: images.hero, caption: "Contact information", lastOpened: "10:11" },
];

const RecentForms = () => {
  return (
    <section className="flex justify-center flex-col gap-5 py-10 px-6 md:px-20 lg:px-40">
      <h5 className="self-start text-black">Recent forms</h5>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 lg:gap-x-5">
        {recentForms.map((form, index) => {
          return <RecentForm key={index.toString()} {...form} />;
        })}
      </div>
    </section>
  );
};

export default RecentForms;
