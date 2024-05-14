import { areEqual, daysOfWeek, useRangeGrid } from "./utils";
import { isAfter, isBefore } from "date-fns";
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import { DateCell } from "./DateCell";
import { DatePickerHeader } from "./DatePickerHeader";
import { IComponentBaseProps } from "../../../../types";
import { Typography } from "../../../../ui/Typography";
import { formatDate } from "../../../../utils";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

export interface IPrivateRangePickerProps extends IComponentBaseProps {
  value: Date[];
  onChange: (date: Date[]) => void;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const PrivateRangePicker = (props: IPrivateRangePickerProps) => {
  const { value, onChange } = props;
  const hasValue = value != null && Array.isArray(value) && value.length === 2;
  const givenStart = hasValue ? value[0] : null;
  const givenEnd = hasValue ? value[1] : null;
  const [activeDate, setActiveDate] = useState<Date>(
    hasValue ? value[0] : new Date()
  );
  const [start, setStart] = useState<null | Date>(givenStart);
  const [end, setEnd] = useState<null | Date>(givenEnd);
  const [hoverEnd, setHoverEnd] = useState<null | Date>(null);

  useEffect(() => {
    setActiveDate(givenStart ?? new Date());
    setStart(givenStart);

    setEnd(givenEnd);
  }, [givenStart, givenEnd, hasValue]);

  const dates = useRangeGrid({
    ...props,
    activeDate,
    start,
    end,
    hoverStart: start,
    hoverEnd,
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
              range
              key={date.value.toDateString()}
              date={date}
              onMouseEnter={() => {
                if (
                  start != null &&
                  end == null &&
                  isAfter(date.value, start)
                ) {
                  setHoverEnd(date.value);
                }
              }}
              onMouseLeave={() => {
                setHoverEnd(null);
              }}
              onChange={(date) => {
                if (end != null || start == null) {
                  setStart(date);
                  setEnd(null);
                } else if (start) {
                  if (isAfter(start, date)) {
                    return;
                  }
                  setEnd(date);
                  setHoverEnd(null);
                  onChange([start, date]);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
