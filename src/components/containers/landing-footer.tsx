"use client";

const LandingFooter = () => {
  return (
    <footer className="bg-grey px-6 lg:px-16 py-10 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <h4 className="lg:text-xl text-primarytext font-medium">Bowal Forms</h4>

        <div className="flex gap-5 text-primarytext font-medium">
          <h4>About Bowal</h4>
          <h4>Privacy</h4>
          <h4>Terms</h4>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
