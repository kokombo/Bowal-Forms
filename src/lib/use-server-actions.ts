"use client";
import { useEffect, useRef, useState, useTransition } from "react";

export const useServerAction = <P, R>(
  action: (_: P) => Promise<R>,
  onFinished?: (_: R | undefined) => void
): [(_: P) => Promise<R | undefined>, boolean] => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<R>();
  const [finished, setFinished] = useState(false);
  const resolver = useRef<(value?: R | PromiseLike<R>) => void>();

  useEffect(() => {
    if (!finished) return;

    if (onFinished) onFinished(result);
    resolver.current?.(result);
    resolver.current = undefined;
  }, [result, finished, onFinished]);

  const runAction = async (args: P): Promise<R | undefined> => {
    setFinished(false);
    setResult(undefined);

    startTransition(async () => {
      try {
        const data = await action(args);
        setResult(data);
        setFinished(true);
      } catch (error) {
        console.error("Action failed:", error);
        setFinished(true);
      }
    });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  return [runAction, isPending];
};
