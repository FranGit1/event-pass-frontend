import { useFormError, useFormField } from './hooks';
import { FieldError } from '../components/FieldError';
import { Feature, IFormFieldComponentBaseProps } from '../../types';
import tw from 'twin.macro';
import { FeatureCheckbox } from '../controlled/FeatureCheckbox';

interface IFormCheckboxProps extends IFormFieldComponentBaseProps {
  feature: Feature;
  error?: any;
}

export const FormFeatureCheckbox = (props: IFormCheckboxProps) => {
  const field = useFormField(props.name);
  let error = useFormError(props.name);
  error = props.error;
  console.log('inside', error);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <FeatureCheckbox
        label={props.label}
        onChange={(value) => {
          field.onChange(value);
          props.onChange && props.onChange(value);
        }}
        value={field.value ?? false}
        disabled={props.disabled}
        feature={props.feature}
        error={error}
      />
      <FieldError disabled={props.disabled} name={props.name} />
    </div>
  );
};
