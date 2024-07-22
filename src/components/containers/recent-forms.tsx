"use client";

import images from "@/constants";
import RecentForm from "../ui/recent-form";

const recentForms = [
  { image: images.hero, caption: "Blank Form", lastOpened: "10:11" },
  { image: images.hero, caption: "Contact Information", lastOpened: "10:11" },
  { image: images.hero, caption: "RSVP", lastOpened: "10:11" },
  { image: images.hero, caption: "Party Invite", lastOpened: "10:11" },
  { image: images.hero, caption: "T-Shirt Sign Up", lastOpened: "10:11" },
];

const RecentForms = () => {
  return (
    <section className="flex justify-center flex-col gap-5 py-10 px-6 md:px-20 lg:px-40">
      <div>
        {recentForms.map((form, index) => {
          return <RecentForm key={index.toString()} {...form} />;
        })}
      </div>
    </section>
  );
};

export default RecentForms;
