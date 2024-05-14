import { daysOfWeek, useDateGrid } from "./utils";
import { useEffect, useState } from "react";

import { DateCell } from "./DateCell";
import { DatePickerHeader } from "./DatePickerHeader";
import { IComponentBaseProps } from "../../../../types";
import { Typography } from "../../../../ui/Typography";
import tw from "twin.macro";

export interface IPrivateDatePickerProps extends IComponentBaseProps {
  value: Date;
  onChange: (date: Date) => void;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const PrivateDatePicker = (props: IPrivateDatePickerProps) => {
  const { value, onChange } = props;
  const [activeDate, setActiveDate] = useState<Date>(value ?? new Date());

  useEffect(() => {
    setActiveDate(value ?? new Date());
  }, [value]);

  const dates = useDateGrid({
    ...props,
    activeDate,
  });

  return (
    <div css={[tw`bg-white flex flex-col w-64 py-2`]}>
      <DatePickerHeader value={activeDate} onChange={setActiveDate} />
      <div css={[tw`grid grid-cols-7`]}>
        {daysOfWeek.map((day: string) => {
          return (
            <Typography.Caption
              key={day}
              containerCss={[tw`text-center font-400`]}
            >
              {day.toUpperCase()}
            </Typography.Caption>
          );
        })}
        {dates.map((date) => {
          return (
            <DateCell
              range={false}
              key={date.value.toDateString()}
              date={date}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
};
