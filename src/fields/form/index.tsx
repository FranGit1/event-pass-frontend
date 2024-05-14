import { FormTextInput } from './FormTextInput';
import { FormTextArea } from './FormTextArea';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormDatePicker } from './FormDatePicker';
import { FormRadioGroup } from './FormRadioGroup';
import { FormRichTextEditor } from './FormRichTextArea';
import { FormCheckboxGroup } from './FormCheckboxGroup';
import { FormFeatureCheckbox } from './FormFeatureCheckbox';
import { FormFileField } from './file-field/FormFileField';
import { FormImageAnnotation } from './file-field/FormImageAnnotation';
import { FormImageAnnotationUnits } from './file-field/FormImageAnnotationUnits';

export const Form = {
  TextInput: FormTextInput,
  TextArea: FormTextArea,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  FeatureCheckbox: FormFeatureCheckbox,
  DatePicker: FormDatePicker,
  RadioGroup: FormRadioGroup,
  CheckboxGroup: FormCheckboxGroup,
  RichTextEditor: FormRichTextEditor,
  Files: FormFileField,
  ImageAnnotation: FormImageAnnotation,
  ImageAnnotationUnits: FormImageAnnotationUnits
};
