"use client";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getHash = () =>
  typeof window !== "undefined" ? window.location.hash : undefined;

export const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState(getHash);
  const [param, setParam] = useState<null | Params>(null);
  const params = useParams();

  useEffect(() => {
    setIsClient(true);
    setHash(getHash);
    setParam(params);
  }, [params]);

  return isClient ? hash : null;
};
