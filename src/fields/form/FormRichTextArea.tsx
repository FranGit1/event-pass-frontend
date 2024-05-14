import { useFormError, useFormField } from "./hooks";

import { FieldError } from "../components/FieldError";
import { IFormFieldComponentBaseProps } from "../../types";
import { RichTextEditor } from "../controlled/RichTextEditor";
import tw from "twin.macro";

export interface IFormRichTextEditorProps
  extends Omit<
    IFormFieldComponentBaseProps,
    "label" | "required" | "disabled"
  > {}

export const FormRichTextEditor = (props: IFormRichTextEditorProps) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <RichTextEditor
        placeholder={props.placeholder}
        value={field.value}
        onChange={field.onChange}
        error={error}
      />
      <FieldError name={props.name} containerCss={[tw`ml-4`]} />
    </div>
  );
};
