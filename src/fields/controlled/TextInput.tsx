import "twin.macro";

import {
  IComponentBaseProps,
  Maybe,
  ReactComponent,
  TwinStyle,
} from "../../types";

import { FieldLabel } from "../components/FieldLabel";
import { PropsWithChildren } from "react";
import { addAsterisk } from "../../utils";
import tw from "twin.macro";

type BaseProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange" | "value"
> &
  IComponentBaseProps;

interface IBaseTextInputProps extends BaseProps {
  lead?: ReactComponent<any>;
  trail?: ReactComponent<any>;
  inputCss?: Maybe<TwinStyle>;
  textCss?: Maybe<TwinStyle>;
  errorCss?: Maybe<TwinStyle>;
  leadCss?: Maybe<TwinStyle>;
  trailCss?: Maybe<TwinStyle>;
  disabledCss?: Maybe<TwinStyle>;
  error?: Maybe<string>;
  label?: Maybe<string>;
  onChange(value: string): void;
  value: Maybe<string>;
  onTrailIconClick?(): void;
}
const BaseTextInput = ({
  lead,
  leadCss,
  trail,
  trailCss,
  containerCss,
  error,
  errorCss,
  inputCss,
  onChange,
  textCss,
  disabledCss,
  onTrailIconClick,
  ...inputProps
}: PropsWithChildren<IBaseTextInputProps>) => {
  const Lead = lead;
  const Trail = trail;
  const leadStyle = [tw`mr-3 w-4.75 h-4.75`, leadCss];
  const trailStyle = [tw`ml-3 w-4.75 h-4.75`, trailCss];

  return (
    <div css={[containerCss]}>
      <FieldLabel
        isInErrorState={!!error}
        containerCss={[
          tw`mb-0.5 text-start`,
          inputProps.disabled && tw`text-gray`,
        ]}
      >
        {addAsterisk(inputProps.label, inputProps.required, !!error)}
      </FieldLabel>
      <div
        className="group"
        css={[
          tw`flex flex-row items-center py-3 px-5 border-2 border-transparent   `,
          tw`focus-within:(hover:(text-black)) `,
          !error && tw`hover:(border-2 border-primary bg-white text-primary)`,
          // error && tw`placeholder:(text-sold)`,
          inputCss,
          error && errorCss,
          inputProps.value && tw`hover:( text-black)`,

          inputProps.disabled && tw`cursor-not-allowed`,
          inputProps.disabled && disabledCss,
        ]}
        onClick={inputProps.onClick}
      >
        {Lead && <Lead css={leadStyle} containerCss={leadStyle} />}
        <input
          {...inputProps}
          value={inputProps.value ?? ""}
          type={(inputProps.type ?? "text") as any}
          onChange={(e) => onChange(e.target.value)}
          css={[
            tw`ring-0 outline-none flex-1 bg-inherit`,
            textCss,
            inputProps.disabled && tw`cursor-not-allowed`,
          ]}
        />
        {Trail && (
          <Trail
            css={trailStyle}
            containerCss={trailStyle}
            onClick={onTrailIconClick}
          />
        )}
      </div>
    </div>
  );
};

export type ITextInputProps = Omit<
  IBaseTextInputProps,
  | "inputCss"
  | "focusedCss"
  | "bluredCss"
  | "errorCss"
  | "textCss"
  | "disabledCss"
>;

export const TextInput = {
  Contained: (props: PropsWithChildren<ITextInputProps>) => {
    const { leadCss, trailCss, error, ...rest } = props;
    return (
      <BaseTextInput
        {...rest}
        error={error}
        inputCss={[
          tw`rounded-full bg-white border-2 border-gray-light`,
          tw`focus-within:(border-2 border-primary bg-white )`,
          props.error && tw`focus-within:(ring-error-light)`,
          props.error && tw`focus-within:ring-error-light`,
        ]}
        errorCss={[tw`border-error`]}
        leadCss={[
          tw`group-focus-within:text-primary text-gray-300`,
          tw`group-focus:text-primary `,
          props.disabled && tw`text-gray`,
          props.onBlur && props.value && !props.disabled && tw`text-gray-100`,
          leadCss,
        ]}
        trailCss={[
          tw`group-focus-within:text-primary text-gray-400`,
          props.disabled && tw`text-gray`,
          trailCss,
        ]}
        textCss={[
          tw`group-focus-within:(placeholder:(text-black) text-black) text-body font-400 -tracking-0.03 text-gray placeholder:(text-black)`,
          props.disabled && tw`text-gray placeholder:text-gray`,
        ]}
        disabledCss={[tw`bg-white border-gray hover:(bg-white  border-gray )`]}
      >
        {props.children}
      </BaseTextInput>
    );
  },
  Outlined: (props: PropsWithChildren<ITextInputProps>) => {
    const { leadCss, trailCss, error, ...rest } = props;
    return (
      <BaseTextInput
        {...rest}
        error={error}
        inputCss={[
          tw`rounded-md bg-white border-1 border-gray`,
          tw`focus-within:(border-2 border-primary bg-white ring-2 ring-primary-400)`,
          props.error && tw`focus-within:(ring-error-light)`,
          props.error && tw`focus-within:ring-error-light`,
        ]}
        errorCss={[tw`border-error`]}
        leadCss={[
          tw`group-focus-within:text-primary text-gray-300`,
          tw`group-focus:text-primary `,
          props.disabled && tw`text-gray`,
          props.onBlur && props.value && !props.disabled && tw`text-gray-100`,
          leadCss,
        ]}
        trailCss={[
          tw`group-focus-within:text-primary text-gray-400`,
          props.disabled && tw`text-gray`,
          trailCss,
        ]}
        textCss={[
          tw`group-focus-within:(placeholder:(text-gray-100) text-gray-100) text-body font-400 -tracking-0.03 text-black placeholder:(text-gray-300)`,
          props.disabled && tw`text-gray placeholder:text-gray`,
        ]}
        disabledCss={[tw`bg-white border-gray hover:(bg-white  border-gray )`]}
      >
        {props.children}
      </BaseTextInput>
    );
  },
  Rounded: (props: PropsWithChildren<ITextInputProps>) => {
    const { leadCss, trailCss, error, ...rest } = props;
    return (
      <BaseTextInput
        {...rest}
        error={error}
        inputCss={[
          tw`rounded-full bg-white border-2 border-gray-light`,
          tw`focus-within:(border-2 border-primary bg-white)`,
          props.error && tw`focus-within:(ring-error-light)`,
          props.error && tw`focus-within:ring-error-light`,
        ]}
        errorCss={[tw`border-error`]}
        leadCss={[
          tw`group-focus-within:text-primary text-gray-300`,
          tw`group-focus:text-primary `,
          props.disabled && tw`text-gray`,
          props.onBlur && props.value && !props.disabled && tw`text-gray-100`,
          leadCss,
        ]}
        trailCss={[
          tw`group-focus-within:text-primary text-gray-400`,
          props.disabled && tw`text-gray`,
          trailCss,
          props.error && tw`text-gray-400`,
          ,
        ]}
        textCss={[
          tw`group-focus-within:(placeholder:(text-gray-light) text-gray) -tracking-0.03  text-gray font-normal placeholder:(text-gray )`,
          props.disabled && tw`text-gray placeholder:text-gray`,
          props.error && tw`text-black placeholder:text-black`,
        ]}
        disabledCss={[tw`bg-white border-gray hover:(bg-white  border-gray )`]}
      >
        {props.children}
      </BaseTextInput>
    );
  },
};
