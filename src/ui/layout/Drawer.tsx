import "twin.macro";

import { IComponentBaseProps, Maybe, TwinStyle } from "../../types";

import { Freeze } from "../../components/Freeze";
import { HiX } from "react-icons/hi";
import { PropsWithChildren } from "react";
import ReactDrawer from "rc-drawer";
import tw from "twin.macro";
import LanguageSelect from "../../components/LanguageSelect";
import { IconButton } from "../buttons/IconButton";

export interface IDrawerProps extends IComponentBaseProps {
  open: boolean;
  onClose(): void;
  closeIconContainerCss?: Maybe<TwinStyle>;
  closeIconCss?: Maybe<TwinStyle>;
  bodyCss?: Maybe<TwinStyle>;
  showLanguageSelect?: boolean;
}

export const Drawer = (props: PropsWithChildren<IDrawerProps>) => {
  // const widthPercentage = props.widthPercentage ?? widthPercentagePerScreen[getBreakpoint()];
  // const desiredWidth = (window.screen.width * widthPercentage) / 100;
  // const maxWidth = (maxPercentage / 100) * window.screen.width;
  // const width = Math.min(maxWidth, desiredWidth);
  return (
    <ReactDrawer
      // STATEMENT: Why is number transformed to string?
      // If the width is string, ReactDrawer will treat it as a width in pixels.
      // If the width is number, ReactDrawer will treat it as a percentage.
      // width={`${width}`}
      tw="z-50"
      css={[props.containerCss]}
      open={props.open}
      handler={false}
      maskClosable
      placement="right"
      onClose={props.onClose}
    >
      <div css={[tw`h-full relative`]}>
        <div tw="flex items-center justify-between p-5">
          <IconButton.Text
            icon={HiX}
            onClick={() => props.onClose()}
            iconCss={[tw`h-6 w-6 text-primary`, props.closeIconCss]}
            containerCss={[
              tw`absolute right-4 top-4 z-[51]`,
              props.closeIconContainerCss,
            ]}
          />
          {props.showLanguageSelect && <LanguageSelect />}
        </div>
        <div css={[tw`absolute top-20 m-6 h-full w-full`, props.bodyCss]}>
          {/*
            STATEMENT: What is Freeze?
            Freeze is a short component which ensures that it's children are never updated if the value is
            first false and then true. Closing the drawer sometimes wipes the state in the parent component which is
            needed to render the drawer content properly. For example, we could open a drawer when someone selects a
            user from table of users. Likely, we would pass userId into the drawer content. 
            There we would maybe call a hook to retrieve user details, but if we close the drawer, userId would be null
            and our hook won't be able to run. This is all avoided by freezing the content of the drawer when the
            drawer is closed.     
          */}
          <Freeze value={!props.open}>{props.children}</Freeze>
        </div>
      </div>
    </ReactDrawer>
  );
};
