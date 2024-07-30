import { FormTextInput } from "./FormTextInput";
import { FormTextArea } from "./FormTextArea";
import { FormSelect } from "./FormSelect";
import { FormCheckbox } from "./FormCheckbox";
import { FormDatePicker } from "./FormDatePicker";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormRichTextEditor } from "./FormRichTextArea";
import { FormCheckboxGroup } from "./FormCheckboxGroup";
import { FormFileField } from "./file-field/FormFileField";

export const Form = {
  TextInput: FormTextInput,
  TextArea: FormTextArea,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  DatePicker: FormDatePicker,
  RadioGroup: FormRadioGroup,
  CheckboxGroup: FormCheckboxGroup,
  RichTextEditor: FormRichTextEditor,
  Files: FormFileField,
};
