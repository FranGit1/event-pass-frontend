import {
  IDatePickerProps,
  DatePicker,
} from "../controlled/date-picker/DatePicker";
// import DatePicker from "react-datepicker";

import { useFormError, useFormField } from "./hooks";

import { FieldError } from "../components/FieldError";
import { IFormFieldComponentBaseProps } from "../../types";
import tw from "twin.macro";
import { fi } from "date-fns/locale";
// import { DatePicker } from "@mui/x-date-pickers";
// import { IDatePickerProps } from '../controlled/date-picker/DatePicker';

export type IFormDatePickerProps = IFormFieldComponentBaseProps &
  Omit<IDatePickerProps, "value" | "onChange">;

export const FormDatePicker = (props: IFormDatePickerProps) => {
  const field = useFormField(props.name);
  const error = useFormError(props.name);

  return (
    <div css={[tw`flex-1 w-full`, props.containerCss]}>
      <DatePicker
        label={props.label}
        value={field.value}
        onChange={field.onChange}
        disabled={props.disabled}
        error={error}
        required={props.required}
        placeholder={props.placeholder}
        disableFutureDates={props.disableFutureDates}
        disablePastDates={props.disablePastDates}
        maxDate={props.maxDate}
        minDate={props.minDate}
      />
      {/* <DatePicker value={field.value} onChange={field.onChange} /> */}

      {/* <DatePicker
        tw="border-gray border-1 p-3 rounded-md"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        required
        name="birthPlace"
        placeholderText="Mjesto"
        dateFormat="d. MMM y." // Set the desired date format
        locale="hr" // Set the locale to Croatian (hr)
      /> */}
      <FieldError name={props.name} containerCss={[tw`ml-4`]} />
    </div>
  );
};
