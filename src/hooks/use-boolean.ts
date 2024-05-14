import { Dispatch, SetStateAction, useState } from "react";

type ReturnType = [
  boolean,
  {
    on: Dispatch<SetStateAction<void>>;
    off: Dispatch<SetStateAction<void>>;
    toggle: Dispatch<SetStateAction<void>>;
    setState: Dispatch<SetStateAction<boolean>>;
  }
];
export function useBoolean(initialValue = false): ReturnType {
  const [state, setState] = useState<boolean>(initialValue);

  return [
    state,
    {
      on: () => setState(true),
      off: () => setState(false),
      toggle: () => setState(!state),
      setState,
    },
  ];
}
