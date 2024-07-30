import { atom } from "recoil";

export const adminSelectedEventIdAtom = atom<number | undefined>({
  key: "adminSelectedEventIdAtom",
  default: undefined,
});
