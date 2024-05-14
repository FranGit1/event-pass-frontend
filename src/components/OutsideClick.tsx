import "twin.macro";

import { FC, PropsWithChildren } from "react";

import { useOnClickOutside } from "../hooks/use-on-outside-click";

export interface IOutsideClickProps {
  onOutsideClick: () => void;
}

export const OutsideClick: FC<PropsWithChildren<IOutsideClickProps>> = (
  props
) => {
  const ref = useOnClickOutside(props.onOutsideClick);
  return <div ref={ref}>{props.children}</div>;
};
