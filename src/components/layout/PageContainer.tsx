import { FC, PropsWithChildren } from 'react';

import { IComponentBaseProps } from '../../types';
import tw from 'twin.macro';

export interface IPageContainer extends IComponentBaseProps {}

export const PageContainer: FC<PropsWithChildren<IPageContainer>> = (props) => {
  return (
    <div
      css={[
        // STATEMENT: This is where you can change background color of the entire screen.
        tw`bg-white mx-auto py-4 md:px-12 md:py-0  `,
        // STATEMENT: Why this container has max-width set up?
        // This is done avoid content stretching and looking ugly on big screens.
        // If you need to expand to full width, replace max-w-7xl with max-w-full

        // STATEMENT: Why this container has height of (100vh-4rem)?
        // This component is expected to be used below header. Header takes 4 rem of space,
        // therefore the final height is (100vh - 4rem).
        // You can't just set up height: 100% since percentages in height property are relative percentages
        // based on the height of the parent. Therefore you need to traverse your DOM and set up height for each div.
        // If this is not working for you, there are two options:
        // 1) Simply replace the height calculation with h-screen
        // 2) Override this style with props.containerCss
        tw`max-w-full w-full`,
        // STATEMENT: What if I don't want my content to be centered vertically?
        // Simply remove mx-auto property.
        // tw`py-4 `,
        // tw`xs:( py-6)`,
        // tw`sm:( py-8)`,
        // tw`md:(py-8)`,
        props.containerCss
      ]}
    >
      {props.children}
    </div>
  );
};
