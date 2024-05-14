import 'twin.macro';

import { HTMLInputTypeAttribute, PropsWithChildren } from 'react';
import { IFormFieldComponentBaseProps, Maybe, ReactComponent, TwinStyle } from '../../types';
import { useFormError, useFormField } from './hooks';

import { FieldError } from '../components/FieldError';
import { TextInput } from '../controlled/TextInput';
import tw from 'twin.macro';

interface IBaseFormTextInputProps extends IFormFieldComponentBaseProps {
  input: (typeof TextInput)['Outlined'];
  lead?: ReactComponent<any>;
  trail?: ReactComponent<any>;
  type?: HTMLInputTypeAttribute | undefined;
  leadCss?: Maybe<TwinStyle>;
  onTrailIconClick?(): void;
  trailCss?: Maybe<TwinStyle>;
  autoComplete?: string | undefined;
  autoFocus?: boolean | undefined;
}

const BaseFormTextInputForm = (props: IBaseFormTextInputProps) => {
  const { name, input, containerCss, type, ...rest } = props;
  const field = useFormField(name);
  const error = useFormError(name);
  const Input = input;
  const maxDate = new Date().toLocaleDateString('en-CA');

  return (
    <div css={[tw`flex-1 w-full`, containerCss]}>
      <Input
        onChange={field.onChange}
        value={field.value}
        onBlur={field.onBlur}
        error={error}
        type={type}
        {...(type === 'date' ? { max: maxDate } : {})}
        {...rest}
      />
      <FieldError name={name} containerCss={[tw``]} />
    </div>
  );
};

export type IFormTextInputProps = Omit<IBaseFormTextInputProps, 'input'>;

export const FormTextInput = {
  Outlined: (props: PropsWithChildren<IFormTextInputProps>) => {
    return <BaseFormTextInputForm {...props} input={TextInput.Outlined} />;
  },
  Contained: (props: PropsWithChildren<IFormTextInputProps>) => {
    return <BaseFormTextInputForm {...props} input={TextInput.Contained} />;
  },
  Rounded: (props: PropsWithChildren<IFormTextInputProps>) => {
    return <BaseFormTextInputForm {...props} input={TextInput.Rounded} />;
  }
};
