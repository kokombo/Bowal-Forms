"use client";

import Link from "next/link";
import React from "react";

type AuthFooterCTAProps = {
  text: string;
  href: string;
  ctaLabel: string;
};

const AuthFooterCTA = ({ text, href, ctaLabel }: AuthFooterCTAProps) => {
  return (
    <span className="text-black font-medium text-sm">
      {text}{" "}
      <Link href={href} className="text-primary hover:underline">
        {ctaLabel}
      </Link>
    </span>
  );
};

export default AuthFooterCTA;
