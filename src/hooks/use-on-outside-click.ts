import { useEffect, useRef } from "react";

type Cb = (event: any) => void;

export function useOnClickOutside(cb: Cb) {
  const ref = useRef<any>();
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      // If the contains function is undefined it means you didn't mount ref correctly
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      cb(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, cb]);
  return ref;
}
