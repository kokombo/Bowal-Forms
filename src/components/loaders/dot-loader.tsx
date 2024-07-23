"use client";

import React from "react";
import { ColorRing } from "react-loader-spinner";

const DotLoader = () => {
  return (
    <div className="bg-transparent fixed left-0 top-0 flex items-center justify-center h-screen w-full z-10">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default DotLoader;
