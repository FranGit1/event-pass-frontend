import "twin.macro";

import { useFormError, useFormField } from "./hooks";

import { FieldError } from "../components/FieldError";
import { IFormFieldComponentBaseProps } from "../../types";
import { PropsWithChildren } from "react";
import { TextArea } from "../controlled/TextArea";
import tw from "twin.macro";

interface IBaseFormTextAreaProps extends IFormFieldComponentBaseProps {
  input: (typeof TextArea)["Outlined"];
  autofocus?: boolean;
  rows?: number;
}

const BaseFormTextAreaForm = (props: IBaseFormTextAreaProps) => {
  const { name, input, containerCss, ...rest } = props;
  const field = useFormField(name);
  const error = useFormError(name);
  const Input = input;
  return (
    <div css={[tw`flex-1 w-full`, containerCss]}>
      <Input
        onChange={field.onChange}
        error={error}
        value={field.value}
        {...rest}
      />
      <FieldError name={name} containerCss={[tw`ml-4`]} />
    </div>
  );
};

export type IFormTextAreaProps = Omit<IBaseFormTextAreaProps, "input">;

export const FormTextArea = {
  Outlined: (props: PropsWithChildren<IFormTextAreaProps>) => {
    return <BaseFormTextAreaForm {...props} input={TextArea.Outlined} />;
  },
};
