import {
  IComponentBaseProps,
  Maybe,
  ReactComponent,
  TwinStyle,
  VariantProps,
} from "../../types";

import { MouseEventHandler, useState } from "react";

import tw from "twin.macro";

interface IBaseIconButtonProps extends IComponentBaseProps {
  icon: ReactComponent<any>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconCss?: Maybe<TwinStyle>;
}

const BaseIconButton = (props: IBaseIconButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const Icon = props.icon;

  const onClick = async (e: any) => {
    try {
      if (!loading) {
        setLoading(true);
        await (props.onClick && props.onClick(e));
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const iconCss = [tw`w-4 h-4`, props.iconCss];

  return (
    <button
      type="button"
      disabled={props.disabled ?? false}
      css={[
        // STATEMENT: Buttons have transparent border.
        // This is done to avoid height change when the border is actually visible in other states(hover, disabled, focused)
        // Alternatives are:
        // 1) use outline instead of border - not the same flexibility and power of the border property.
        // 2) hardcode height on this button - you can guess why this is discouraged
        // 3) subtract button padding when the border is visible - adds one more layer of complexity in this project
        tw`border-2 p-2 border-transparent items-center rounded-full cursor-pointer`,
        props.containerCss,
      ]}
      onClick={onClick}
    >
      {/* 
        STATEMENT: It seems apsurd to map same style on two different properties
        Icon is React component. It could be our component(accept containerCss)
        or they it could be third-part component(accepts className and style).           
      */}
      <Icon css={iconCss} containerCss={iconCss} />
    </button>
  );
};

export type IIconButtonProps = IBaseIconButtonProps & VariantProps;

export const IconButton = {
  Contained: (props: IIconButtonProps) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseIconButton
        {...props}
        iconCss={[
          tw`text-white`,
          props.disabled && tw`text-gray-200`,
          props.iconCss,
        ]}
        containerCss={[
          isPrimary ? tw`bg-primary-100` : tw`bg-secondary`,
          isPrimary ? tw`hover:(bg-primary)` : tw`hover:(bg-secondary)`,
          isPrimary
            ? tw`focus-visible:(bg-primary-100 border-primary border-2 ring-2 ring-primary-400 outline-none)`
            : tw`focus-visible:(bg-secondary border-secondary border-2 ring-2 ring-secondary-200 outline-none)`,
          isPrimary ? tw`disabled:(bg-gray-400)` : tw`disabled:(bg-gray-400)`,
          props.containerCss,
        ]}
      />
    );
  },
  Outlined: (props: IIconButtonProps) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseIconButton
        {...props}
        iconCss={[
          isPrimary ? tw`text-primary-100` : tw`text-secondary`,
          props.disabled && tw`text-gray-200`,
          props.iconCss,
        ]}
        containerCss={[
          isPrimary
            ? tw`bg-white border-primary-100`
            : tw`bg-white border-secondary`,
          isPrimary
            ? tw`hover:(bg-primary-400 border-primary-100 border-2)`
            : tw`hover:(bg-secondary-300 border-secondary border-2)`,
          isPrimary
            ? tw`focus-visible:(bg-primary-400 border-primary-100 border-2 ring-2 ring-primary-400 outline-none)`
            : tw`focus-visible:(bg-secondary-300 border-secondary border-2 ring-2 ring-secondary-200 outline-none)`,
          isPrimary
            ? tw`disabled:(bg-gray-400 border-gray-400 border-2)`
            : tw`disabled:(bg-gray-400 border-gray-400 border-2)`,
          props.containerCss,
        ]}
      />
    );
  },
  Text: (props: IIconButtonProps) => {
    const isPrimary = !(props.variant === "secondary");
    return (
      <BaseIconButton
        {...props}
        iconCss={[
          isPrimary ? tw`text-primary-100` : tw`text-secondary`,
          props.disabled && tw`text-gray-200`,
          props.iconCss,
        ]}
        containerCss={[
          isPrimary
            ? tw`hover:(bg-primary-400 disabled:(bg-transparent))`
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
