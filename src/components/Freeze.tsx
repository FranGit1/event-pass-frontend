import { PropsWithChildren, memo } from "react";

import { IComponentBaseProps } from "../types";

export interface IFreezeProps extends IComponentBaseProps {
  value: boolean;
}

export const Freeze = memo(
  (props: PropsWithChildren<IFreezeProps>) => {
    return <div>{props.children}</div>;
  },
  (prevProps, nextProps) => !prevProps.value && nextProps.value
);
