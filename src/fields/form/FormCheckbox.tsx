import { useFormError, useFormField } from './hooks';

import { Checkbox } from '../controlled/Checkbox';
import { FieldError } from '../components/FieldError';
import { IFormFieldComponentBaseProps } from '../../types';
import tw from 'twin.macro';

interface IFormCheckboxProps extends IFormFieldComponentBaseProps {
  // value: number;
}

export const FormCheckbox = (props: IFormCheckboxProps) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <Checkbox
        label={props.label}
        onChange={(value) => {
          field.onChange(value);
          props.onChange && props.onChange(value);
        }}
        value={field.value ?? false}
        disabled={props.disabled}
        error={error}
      />
      <FieldError disabled={props.disabled} name={props.name} />
    </div>
  );
};
