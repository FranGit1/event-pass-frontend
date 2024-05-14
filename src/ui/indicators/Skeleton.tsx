import "twin.macro";

import { IComponentBaseProps } from "../../types";
import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import tw from "twin.macro";

interface ISkeletonProps extends IComponentBaseProps {}

const Skeleton = (props: PropsWithChildren<ISkeletonProps>) => {
  return (
    <div
      tw="w-full"
      css={[
        css`
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `,
      ]}
    >
      {props.children}
    </div>
  );
};

Skeleton.Line = (props: IComponentBaseProps) => {
  return (
    <div
      // STATEMENT: Why do we use min-width?
      // It ensures that this component will at least render something in unconstraint environment.
      // Example of such environment would be using the flex layout without specifying the width of the flex child.
      // This component by default takes as much width as possible(w-full).
      css={[tw`h-4 w-full min-w-8 bg-gray-300 rounded-xl`, props.containerCss]}
    />
  );
};
Skeleton.Circle = (props: IComponentBaseProps) => {
  return (
    <div css={[tw`h-20 w-20 bg-gray-300 rounded-full`, props.containerCss]} />
  );
};

export { Skeleton };
