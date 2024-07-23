"use client";
import RecentForm from "../ui/recent-form";

const RecentForms = ({ recentForms }: { recentForms: Form[] | undefined }) => {
  return (
    <section className="flex justify-center flex-col gap-5 py-10 px-6 md:px-20 lg:px-40 lg:mb-10">
      <h5 className="self-start text-black">Recent forms</h5>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 lg:gap-x-5">
        {recentForms?.map((form) => {
          return <RecentForm key={form.id} {...form} />;
        })}
      </div>
    </section>
  );
};

export default RecentForms;
