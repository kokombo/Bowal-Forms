"use client";

import type { Form } from "@prisma/client";
import RecentForm from "../ui/recent-form";

const RecentForms = ({ recentForms }: { recentForms: Form[] }) => {
  return (
    <section className="flex justify-center flex-col gap-5 py-10 px-6 sm:px-20 md:px-14 xl:px-40 lg:mb-10">
      <h5 className="self-start text-black">Recent forms</h5>

      <>
        {recentForms.length < 1 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-primarytext font-medium lg:text-lg text-center max-w-screen-sm">
              Keep track of your forms here. There are no forms yet. Start
              adding forms now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 lg:gap-x-5">
            {recentForms.map((form) => {
              return <RecentForm key={form.id} {...form} />;
            })}
          </div>
        )}
      </>
    </section>
  );
};

export default RecentForms;
