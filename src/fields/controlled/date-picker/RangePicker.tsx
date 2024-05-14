/** @jsxImportSource @emotion/react */

import {} from "../../../ui/layout/FloatingContent";

import {
  IPrivateRangePickerProps,
  PrivateRangePicker,
} from "./private/PrivateRangePicker";
import React, { useRef } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  useFloating,
  useInteractions,
} from "@floating-ui/react-dom-interactions";

import { AiOutlineClose } from "react-icons/ai";
import { HiCalendar } from "react-icons/hi";
import { IFieldComponentBaseProps } from "../../../types";
import { OutsideClick } from "../../../components/OutsideClick";
import { TextInput } from "../TextInput";
import { formatDate } from "../../../utils";
import tw from "twin.macro";
import { useBoolean } from "../../../hooks/use-boolean";

export type IRangePickerProps = IFieldComponentBaseProps<Date> &
  IPrivateRangePickerProps;

export const RangePicker = (props: IRangePickerProps) => {
  const [open, { off, on, setState: setOpen }] = useBoolean(false);

  const arrowElement = useRef<any>();
  const {
    x,
    y,
    reference: trigger,
    floating,
    strategy,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), arrow({ element: arrowElement! })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([]);

  const hasValue =
    props.value != null &&
    Array.isArray(props.value) &&
    props.value.length === 2;

  return (
    <OutsideClick onOutsideClick={() => off()}>
      <div
        ref={trigger}
        {...getReferenceProps()}
        onClick={() => {
          if (props.disabled) {
            return;
          }
          on();
        }}
      >
        <TextInput.Contained
          disabled={props.disabled}
          tabIndex={undefined}
          readOnly
          value={
            hasValue
              ? `${formatDate(props.value[0])} - ${formatDate(props.value[1])}`
              : ""
          }
          placeholder={props.placeholder}
          error={props.error}
          trail={() =>
            hasValue ? (
              <AiOutlineClose
                css={[
                  tw`w-4.75 h-4.75 cursor-pointer text-gray-100`,
                  props.disabled && tw`text-gray-300`,
                ]}
                onClick={(e: any) => {
                  e.stopPropagation();
                  off();
                  props.onChange([]);
                }}
              />
            ) : (
              <HiCalendar
                css={[tw`text-gray-100`, props.disabled && tw`text-gray-300`]}
              />
            )
          }
          required={props.required}
          onChange={() => {}}
          label={props.label}
        />
      </div>
      {open && (
        <>
          <div
            ref={floating}
            role="dialog"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
            css={[tw`[z-index:100]`, props.containerCss]}
            {...getFloatingProps()}
          >
            <div css={[tw`shadow-menu rounded-md overflow-hidden`]}>
              <PrivateRangePicker
                value={props.value}
                onChange={(value) => {
                  props.onChange(value);
                  off();
                }}
                disableFutureDates={props.disableFutureDates}
                disablePastDates={props.disablePastDates}
                maxDate={props.maxDate}
                minDate={props.minDate}
              />
            </div>
          </div>
        </>
      )}
    </OutsideClick>
  );
};
