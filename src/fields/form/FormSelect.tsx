import { IFormFieldComponentBaseProps, IOption } from "../../types";
import { useFormError, useFormField } from "./hooks";

import { FieldError } from "../components/FieldError";
import { Select } from "../controlled/Select";
import tw from "twin.macro";


export interface IFormSelectProps<T> extends IFormFieldComponentBaseProps {
  autofocus?: boolean;
  options: IOption<T>[];
}

export const FormSelect = (props: IFormSelectProps<any>) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);
  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <Select
        disabled={props.disabled}
        value={field.value}
        autofocus={props.autofocus}
        onChange={field.onChange}
        label={props.label}
        error={error}
        required={props.required}
        placeholder={props.placeholder}
        options={props.options}
      />
      <FieldError name={props.name} containerCss={[tw`ml-4`]} />
    </div>
  );
};
