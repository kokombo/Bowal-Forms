"use client";

import { MdOutlineDehaze } from "react-icons/md";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./sidebar"));

const LandingPageNavbar = () => {
  const [sidebarIsActive, setSidebarIsActive] = useState(false);

  const showSidebar = () => setSidebarIsActive(true);
  const hideSidebar = () => setSidebarIsActive(false);

  return (
    <Fragment>
      <nav className="sticky left-0 top-0 bg-white z-10 px-1 md:px-2 py-4 border-b-1">
        <div className="flex items-center lg:gap-1">
          <Button variant="ghost" onClick={showSidebar}>
            <MdOutlineDehaze size={24} className="text-primarytext" />
          </Button>
          <Logo />
        </div>
      </nav>

      <Sidebar hideSidebar={hideSidebar} sidebarIsActive={sidebarIsActive} />
    </Fragment>
  );
};

export default LandingPageNavbar;
