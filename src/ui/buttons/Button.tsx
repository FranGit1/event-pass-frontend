import {
  IComponentBaseProps,
  Maybe,
  ReactComponent,
  TwinStyle,
  VariantProps,
} from "../../types";
import React, {
  MouseEventHandler,
  MutableRefObject,
  PropsWithChildren,
  useState,
} from "react";

import tw from "twin.macro";
import { Typography } from "../Typography";

type IButtonLoaderProps = IComponentBaseProps;
const ButtonLoader = (props: IButtonLoaderProps) => {
  return (
    <div
      css={[
        tw`w-5.5 h-5.5 border-2 border-t-transparent border-solid rounded-full animate-spin`,
        props.containerCss,
      ]}
    />
  );
};

interface IBaseButtonProps extends IComponentBaseProps {
  type?: "button" | "submit" | "reset" | undefined;
  allowLoader?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  lead?: ReactComponent<any>;
  trail?: ReactComponent<any>;
  loader?: ReactComponent<any>;
  loaderCss?: Maybe<TwinStyle>;
  leadCss?: Maybe<TwinStyle>;
  trailCss?: Maybe<TwinStyle>;
  textCss?: Maybe<TwinStyle>;
  leadSvg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const millisecondsBetweenClicks = 300;

const BaseButton: React.FC<PropsWithChildren<IBaseButtonProps>> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const Lead = props.lead;
  const LeadSvg = props.leadSvg;
  const Trail = props.trail;
  const Loader = props.loader ?? ButtonLoader;

  // STATEMENT: Why is props.onClick wrapped in this logic?
  // In this template all buttons are subjected to the timeout period
  // of 300 ms between clicks. If you don't need such behavior(you probably still need it,
  // please double check with senior) you can simply remove this function or expose another prop to
  // turn on/off this behaviour.
  const onClick = async (e: any) => {
    try {
      if (!loading) {
        setLoading(true);
        await (props.onClick && props.onClick(e));
        setTimeout(() => setLoading(false), millisecondsBetweenClicks);
      }
    } catch (e) {
      console.error(e);
      setTimeout(() => setLoading(false), millisecondsBetweenClicks);
      throw e;
    }
  };

  const leadCss = [tw`mr-3 w-4 h-4`, props.leadCss];
  const trailCss = [tw`ml-3 w-4 h-4`, props.trailCss];

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled ?? false}
      css={[
        // STATEMENT: Buttons have transparent border.
        // This is done to avoid height change when the border is actually visible in other states(hover, disabled, focused)
        // Alternatives are:
        // 1) use outline instead of border - not the same flexibility and power of the border property.
        // 2) hardcode height on this button - you can guess why this is discouraged
        // 3) subtract button padding when the border is visible - adds one more layer of complexity in this project
        tw`border-2 border-transparent rounded-md cursor-pointer `,
        // STATEMENT: Hardcoded min-width is likely to change in each project.
        // This is done to avoid width decrease when the button is in the loading state.
        // If necessary, please change it to your liking.
        tw`flex flex-row items-center justify-center py-2 px-4 min-w-28`,
        props.disabled && tw`cursor-not-allowed`,
        props.containerCss,
      ]}
      onClick={onClick}
    >
      {props.allowLoader && loading ? (
        <Loader containerCss={[props.loaderCss]} />
      ) : (
        <div tw="flex flex-row items-center " className="group">
          {/*
            STATEMENT: It seems apsurd to map same style on two different properties
            Lead and trail icons are React components. They could be our components(accept containerCss)
            or they could be third-part components(accepts className and style).
          */}
          {Lead && <Lead css={leadCss} containerCss={leadCss} />}
          {LeadSvg && <LeadSvg tw="text-white mr-3" css={leadCss} />}
          <Typography.ButtonPrimary containerCss={[props.textCss]}>
            {props.children}
          </Typography.ButtonPrimary>
          {Trail && <Trail css={trailCss} containerCss={trailCss} />}
        </div>
      )}
    </button>
  );
};

export type IButtonProps = IBaseButtonProps & VariantProps;

export const Button = {
  Contained: (props: PropsWithChildren<IButtonProps>) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseButton
        {...props}
        loaderCss={[tw`border-white border-t-transparent`, props.loaderCss]}
        leadCss={[
          isPrimary ? tw`text-white` : tw`text-primary`,
          props.disabled && tw`text-white`,
          props.leadCss,
        ]}
        trailCss={[
          isPrimary ? tw`text-white` : tw`text-primary`,
          props.disabled && tw`text-white`,
          props.trailCss,
        ]}
        textCss={[
          isPrimary
            ? tw`text-white`
            : tw`text-primary hover:(text-primary-100)`,

          props.disabled && tw`text-white`,
          props.textCss,
        ]}
        containerCss={[
          isPrimary ? tw`bg-primary rounded-3xl` : tw`bg-primary-200`,
          isPrimary ? tw`hover:(shadow-button transition duration-300)` : tw``,
          isPrimary ? tw`focus:(scale-[.98])` : tw``,
          isPrimary ? tw`active:(border-2 border-black)` : tw``,
          isPrimary
            ? tw`focus-visible:(bg-primary-100 border-primary border-2 ring-2 ring-primary-400 outline-none)`
            : tw`focus-visible:(bg-secondary border-secondary border-2 ring-2 ring-secondary-200 outline-none)`,
          isPrimary ? tw`disabled:(opacity-60)` : tw`disabled:(opacity-60)`,
          props.containerCss,
        ]}
      />
    );
  },
  Fab: (props: PropsWithChildren<IButtonProps>) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseButton
        {...props}
        loaderCss={[
          tw`border-white border-t-transparent w-fit  m-0 p-0`,
          props.loaderCss,
        ]}
        leadCss={[
          isPrimary ? tw`text-white  m-0 p-0` : tw`text-primary`,
          props.disabled && tw`text-white`,
          props.leadCss,
        ]}
        trailCss={[
          isPrimary ? tw`text-white  m-0 p-0` : tw`text-primary`,
          props.disabled && tw`text-white`,
          props.trailCss,
        ]}
        textCss={[
          isPrimary
            ? tw`text-white m-0 p-0`
            : tw`text-primary hover:(text-primary-100)`,

          props.disabled && tw`text-white`,
          props.textCss,
        ]}
        containerCss={[
          isPrimary ? tw`bg-white rounded-full p-0 m-0 ` : tw`bg-primary-200`,
          isPrimary ? tw`hover:(bg-primary-100 transition duration-300)` : tw``,
          isPrimary
            ? tw`focus-visible:(bg-primary-100 border-primary border-2 ring-2 ring-primary-400 outline-none)`
            : tw`focus-visible:(bg-secondary border-secondary border-2 ring-2 ring-secondary-200 outline-none)`,
          isPrimary
            ? tw`disabled:(bg-gray-disabled)`
            : tw`disabled:(bg-gray-disabled)`,
          props.containerCss,
        ]}
      />
    );
  },
  Outlined: (props: PropsWithChildren<IButtonProps>) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseButton
        {...props}
        loaderCss={[
          isPrimary
            ? tw`border-primary border-t-transparent`
            : tw`border-secondary border-t-transparent`,
          props.loaderCss,
        ]}
        leadCss={[
          isPrimary ? tw`text-primary` : tw`text-secondary`,
          props.disabled && tw`text-gray`,
          props.leadCss,
        ]}
        trailCss={[
          isPrimary ? tw`text-primary` : tw`text-secondary`,
          props.disabled && tw`text-gray`,
          props.leadCss,
        ]}
        textCss={[
          isPrimary ? tw`text-primary` : tw`text-secondary`,
          props.disabled && tw`text-gray`,
          props.textCss,
        ]}
        containerCss={[
          isPrimary
            ? tw`bg-white border-primary rounded-3xl`
            : tw`bg-white border-secondary`,
          isPrimary
            ? tw`hover:(bg-transparent border-primary-100 border-2)`
            : tw`hover:(bg-secondary-300 border-secondary border-2)`,
          isPrimary
            ? tw`focus-visible:(bg-primary-400 border-primary-100 border-2 ring-2 ring-primary-400 outline-none)`
            : tw`focus-visible:(bg-secondary-300 border-secondary border-2 ring-2 ring-secondary-200 outline-none)`,
          isPrimary
            ? tw`disabled:(bg-transparent border-gray border-2)`
            : tw`disabled:(bg-transparent border-gray border-2)`,
          props.containerCss,
        ]}
      />
    );
  },
  Text: (props: PropsWithChildren<IButtonProps>) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseButton
        {...props}
        loaderCss={[
          isPrimary
            ? tw`border-primary-100 border-t-transparent`
            : tw`border-secondary border-t-transparent`,
          props.loaderCss,
        ]}
        leadCss={[
          isPrimary
            ? tw`text-primary group-hover:(text-gray)`
            : tw`text-secondary`,
          props.disabled && tw`text-gray-200`,
          props.leadCss,
        ]}
        trailCss={[
          isPrimary
            ? tw`text-primary group-hover:(text-gray)`
            : tw`text-secondary`,
          props.disabled && tw`text-gray-200`,
          props.leadCss,
        ]}
        textCss={[
          isPrimary
            ? tw`text-primary group-hover:(text-gray)`
            : tw`text-secondary`,
          props.disabled && tw`text-gray-200`,
          props.textCss,
        ]}
        containerCss={[
          isPrimary
            ? tw`hover:(disabled:(bg-transparent))`
            : tw`hover:(bg-secondary-300 disabled:(bg-transparent))`,
          isPrimary
            ? tw`focus-visible:(bg-white border-primary-400 border-2 ring-0 outline-none)`
            : tw`focus-visible:(bg-white border-secondary-100 border-2 ring-0 outline-none)`,
          props.containerCss,
        ]}
      />
    );
  },
};
