import { IFormFieldComponentBaseProps, IOption, Maybe, TwinStyle } from '../../types';
import { useFormError, useFormField } from './hooks';

import { FieldError } from '../components/FieldError';
import { FieldLabel } from '../components/FieldLabel';
import { RadioGroup } from '../controlled/RadioGroup';
import { addAsterisk } from '../../utils';
import tw from 'twin.macro';

type IFormRadioGroupProps = IFormFieldComponentBaseProps & {
  options: IOption<string | boolean>[];
  flexDirectionCss?: Maybe<TwinStyle>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormRadioGroup = (props: IFormRadioGroupProps) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <FieldLabel isInErrorState={!!error} containerCss={[tw`mb-3`, props.disabled && tw`text-gray`]}>
        {addAsterisk(props.label, props.required, !!error)}
      </FieldLabel>
      <RadioGroup
        error={error}
        flexDirectionCss={props.flexDirectionCss}
        onChange={field.onChange}
        value={field.value ?? false}
        disabled={props.disabled}
        options={props.options}
        setOpen={props.setOpen}
      />
      <FieldError disabled={props.disabled} name={props.name} />
    </div>
  );
};
