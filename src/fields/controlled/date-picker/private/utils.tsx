import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";

import { useMemo } from "react";

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthToName = (month: number): string => {
  return MONTHS[month];
};

export interface GridDate {
  value: Date;
  isDisabled: boolean;
  isSelected: boolean;
  isInActiveMonth: boolean;
  selectedStart: boolean;
  selectedEnd: boolean;
}

interface IsDateDisabledOptions {
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

function isDisabled(date: Date, opts: IsDateDisabledOptions) {
  const isDateInPast = isBefore(date, subDays(new Date(), 1));
  const isDateInFuture = isAfter(date, endOfDay(new Date()));

  if (opts.disablePastDates && isDateInPast) {
    return true;
  } else if (opts.disableFutureDates && isDateInFuture) {
    return true;
  } else if (opts.minDate != null && isBefore(date, subDays(new Date(), 1))) {
    return true;
  } else if (opts.maxDate != null && isAfter(date, endOfDay(new Date()))) {
    return true;
  }
  return false;
}

export function areEqual(date1: Date, date2: Date) {
  const y1 = date1.getFullYear();
  const y2 = date2.getFullYear();
  const m1 = date1.getMonth();
  const m2 = date2.getMonth();
  const d1 = date1.getDate();
  const d2 = date2.getDate();
  return y1 === y2 && m1 === m2 && d1 === d2;
}

function generateDateGrid(value: Date) {
  const start = startOfWeek(startOfMonth(value), {
    weekStartsOn: 0,
  });
  const end = endOfWeek(endOfMonth(value), {
    weekStartsOn: 0,
  });
  let iter = start;
  let dates: Date[] = [];

  while (!areEqual(iter, addDays(end, 1))) {
    dates.push(iter);
    iter = addDays(iter, 1);
  }
  return dates;
}

interface IUseDateGridProps {
  value: Date;
  activeDate: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function useDateGrid({
  value,
  activeDate,
  disablePastDates,
  disableFutureDates,
  minDate,
  maxDate,
}: IUseDateGridProps) {
  return useMemo(() => {
    const dates = generateDateGrid(activeDate);

    const gridDates: GridDate[] = [];
    for (let date of dates) {
      gridDates.push({
        value: date,
        isDisabled: isDisabled(date, {
          disableFutureDates,
          disablePastDates,
          minDate,
          maxDate,
        }),
        isSelected: value != null ? areEqual(date, value) : false,
        isInActiveMonth: date.getMonth() === activeDate.getMonth(),
        selectedStart: false,
        selectedEnd: false,
      });
    }
    return gridDates;
  }, [
    activeDate,
    value,
    disablePastDates,
    disableFutureDates,
    minDate,
    maxDate,
  ]);
}

interface IUseRangeGridProps {
  start?: Date | null;
  end?: Date | null;
  activeDate: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  hoverStart?: Date | null;
  hoverEnd?: Date | null;
}

export function useRangeGrid({
  start,
  end,
  activeDate,
  disablePastDates,
  disableFutureDates,
  minDate,
  maxDate,
  hoverEnd,
  hoverStart,
}: IUseRangeGridProps) {
  return useMemo(() => {
    const dates = generateDateGrid(activeDate);
    const hasStart = start != null;
    const hasEnd = end != null;

    const gridDates: GridDate[] = [];
    for (let date of dates) {
      gridDates.push({
        value: date,
        isDisabled: isDisabled(date, {
          disableFutureDates,
          disablePastDates,
          minDate,
          maxDate,
        }),
        isSelected:
          hoverStart != null && hoverEnd != null
            ? isAfter(date, hoverStart) && isBefore(date, hoverEnd)
            : hasStart && hasEnd
            ? isAfter(date, start) && isBefore(date, end)
            : false,
        isInActiveMonth: date.getMonth() === activeDate.getMonth(),
        selectedStart: hoverStart
          ? areEqual(date, hoverStart)
          : hasStart
          ? areEqual(date, start)
          : false,
        selectedEnd: hoverEnd
          ? areEqual(date, hoverEnd)
          : hasEnd
          ? areEqual(date, end)
          : false,
      });
    }
    return gridDates;
  }, [
    hoverStart,
    hoverEnd,
    activeDate,
    start,
    end,
    disablePastDates,
    disableFutureDates,
    minDate,
    maxDate,
  ]);
}
