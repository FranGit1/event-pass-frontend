import { Feature, IFormFieldComponentBaseProps, IOption, Maybe, TwinStyle } from '../../types';
import { useFormError, useFormField } from './hooks';

import { FieldError } from '../components/FieldError';
import { FieldLabel } from '../components/FieldLabel';
import { addAsterisk } from '../../utils';
import tw from 'twin.macro';
import { CheckboxGroup } from '../controlled/CheckboxGroup';

type IFormRadioGroupProps = IFormFieldComponentBaseProps & {
  options: IOption<string | boolean | Feature>[];
  counterDisplay?: boolean;
  labelCss?: Maybe<TwinStyle>;
};

export const FormCheckboxGroup = (props: IFormRadioGroupProps) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <FieldLabel isInErrorState={!!error} containerCss={[tw`mb-3`, props.disabled && tw`text-gray`]}>
        {addAsterisk(props.label, props.required, !!error)}
      </FieldLabel>
      <CheckboxGroup
        error={!!error}
        counterDisplay={props.counterDisplay}
        onChange={field.onChange}
        value={field.value ?? []}
        disabled={props.disabled}
        options={props.options}
        labelCss={props.labelCss}
      />
      <FieldError disabled={props.disabled} name={props.name} />
    </div>
  );
};
