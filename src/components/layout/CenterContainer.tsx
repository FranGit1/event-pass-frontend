import { FC, PropsWithChildren } from 'react';

import { IComponentBaseProps } from '../../types';
import React from 'react';
import invariant from 'invariant';
import tw from 'twin.macro';

export type ICenterContainer = IComponentBaseProps;

export const CenterContainer: FC<PropsWithChildren<ICenterContainer>> = (props) => {
  const childrenSize = React.Children.count(props.children);
  invariant(childrenSize === 1, 'CenterContainer accepts only one child');
  return (
    <div
      css={[
        // STATEMENT: This is where you can change background color of the entire screen.
        tw`bg-white`,
        // STATEMENT: Why this container has max-width set up?
        // This is done avoid content stretching and looking ugly on big screens.
        // If you need to expand to full width, replace max-w-1xl with max-w-full

        // STATEMENT: Why this container has h-screen property?
        // This component is expected to be used on a full page. So no header and footer.
        // If you decide to render some of them on the page that used h-full property
        // it would be best to change height calculation to calc(100vh - HEADER_HEIGHT_OR_FOOTER_HEIGHT)
        // or to override this calculation by using props.containerCss
        tw`h-full!	w-screen`, //max-w-xl
        tw`px-4 py-4 mx-auto my-auto`,
        tw`flex flex-col justify-center`,
        tw`xs:(px-5 py-6)`,
        tw`sm:(px-6 py-8)`,
        tw`md:(px-8 py-8)`,
        props.containerCss
      ]}
    >
      {props.children}
    </div>
  );
};
