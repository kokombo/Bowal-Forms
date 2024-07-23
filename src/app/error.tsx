"use client";

import { useEffect } from "react";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button type="reset" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default ErrorBoundary;
