import 'twin.macro';

import { FocusEventHandler, KeyboardEventHandler, PropsWithChildren } from 'react';
import { IFieldComponentBaseProps, Maybe, TwinStyle } from '../../types';

import { FieldLabel } from '../components/FieldLabel';
import { addAsterisk } from '../../utils';
import tw from 'twin.macro';

interface IBaseTextAreaProps extends IFieldComponentBaseProps<string> {
  rows?: number;
  autofocus?: boolean;
  inputCss?: Maybe<TwinStyle>;
  textCss?: Maybe<TwinStyle>;
  disabledCss?: Maybe<TwinStyle>;
  errorCss?: Maybe<TwinStyle>;
  onFocus?: FocusEventHandler<any> | undefined;
  onBlur?: FocusEventHandler<any> | undefined;
  onKeyDown?: KeyboardEventHandler<any> | undefined;
  onKeyUp?: KeyboardEventHandler<any> | undefined;
}
const BaseTextArea = (props: PropsWithChildren<IBaseTextAreaProps>) => {
  return (
    <div css={[tw`flex flex-col`, props.containerCss]}>
      <FieldLabel isInErrorState={!!props.error} containerCss={[tw`mb-0.5`, props.disabled && tw`text-gray`]}>
        {addAsterisk(props.label, props.required, !!props.error)}
      </FieldLabel>
      <textarea
        value={props.value ?? ''}
        rows={props.rows ?? 5}
        autoFocus={props.autofocus}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        onChange={(e) => props.onChange(e.target.value)}
        css={[
          tw`py-3 px-4`,
          props.inputCss,
          props.textCss,
          props.error && props.errorCss,
          props.disabled && tw`cursor-not-allowed`,
          props.disabled && props.disabledCss
        ]}
      />
    </div>
  );
};

export type ITextAreaProps = Omit<IBaseTextAreaProps, 'inputCss' | 'errorCss' | 'textCss' | 'disabledCss'>;

export const TextArea = {
  Contained: (props: PropsWithChildren<ITextAreaProps>) => {
    return (
      <BaseTextArea
        {...props}
        inputCss={[
          tw`rounded-md bg-white border-1 border-gray`,
          tw`focus:(bg-white ring-2 ring-primary-400 outline-none)`,
          !props.error && tw`hover:bg-primary-500`
        ]}
        errorCss={[tw`border-error`, tw`focus:(border-1 bg-white border-error ring-2 ring-error-light outline-none)`]}
        textCss={[
          tw`text-body font-400 -tracking-0.03 text-gray placeholder:(text-gray-200)`,
          props.disabled && tw`text-gray-300 placeholder:text-gray-300`
        ]}
        disabledCss={[tw`bg-white hover:(bg-white)`]}
      >
        {props.children}
      </BaseTextArea>
    );
  },
  Outlined3: (props: PropsWithChildren<ITextAreaProps>) => {
    return (
      <BaseTextArea
        {...props}
        inputCss={[
          tw`rounded-md bg-white border-1 border-gray`,
          tw`hover:border-primary-100`,
          tw`focus:(bg-white border-primary ring-2 ring-primary-400)`,
          props.error && tw`focus-within:ring-error-light`,
          props.disabled && tw`hover:(border-none)`
        ]}
        errorCss={[tw`border-error`, tw`focus:(border-1 bg-white border-error ring-2 ring-error-light outline-none)`]}
        textCss={[
          tw`focus-within:(placeholder:(text-gray-100) text-gray-100) text-body font-400 -tracking-0.03 text-gray-300 placeholder:(text-gray-300)`,
          props.disabled && tw`text-gray placeholder:text-gray`
        ]}
        disabledCss={[tw`bg-white hover:(bg-white)`]}
      >
        {props.children}
      </BaseTextArea>
    );
  },
  Outlined: (props: PropsWithChildren<ITextAreaProps>) => {
    return (
      <BaseTextArea
        {...props}
        inputCss={[
          tw`rounded-xl bg-white border-2 border-gray-light`,
          tw`focus:(border-2 bg-white border-primary outline-none)`,
          props.error && tw`focus-within:ring-error-light`
        ]}
        errorCss={[tw`border-error`, tw`focus:(border-1 bg-white border-error ring-2 ring-error-light outline-none)`]}
        textCss={[
          tw`focus-within:(placeholder:(text-gray-light) text-gray) text-body font-400 -tracking-0.03 placeholder:(text-gray)`,
          props.disabled && tw`text-gray placeholder:text-gray`,
          props.value && !props.disabled && tw`text-gray`
        ]}
        disabledCss={[tw`bg-white hover:(bg-white)`]}
      >
        {props.children}
      </BaseTextArea>
    );
  }
};
