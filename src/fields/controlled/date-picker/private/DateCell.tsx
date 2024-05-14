import { GridDate } from "./utils";
import { IComponentBaseProps } from "../../../../types";
import { MouseEventHandler } from "react";
import { Typography } from "../../../../ui/Typography";
import tw from "twin.macro";

interface IDateCellProps extends IComponentBaseProps {
  date: GridDate;
  range: boolean;
  onChange: (date: Date) => void;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

export const DateCell = (props: IDateCellProps) => {
  const {
    date: {
      value,
      isDisabled,
      isSelected,
      isInActiveMonth,
      selectedEnd,
      selectedStart,
    },
    range,
    onChange,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const val = value.getDate();

  return (
    <button
      onMouseEnter={(e) => {
        if (isDisabled) {
          return;
        }
        onMouseEnter && onMouseEnter(e);
      }}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDisabled) {
          return;
        }
        onChange(value);
      }}
      css={[
        tw`text-black h-9 flex flex-row items-center justify-center p-0`,
        range && (isSelected || selectedStart || selectedEnd)
          ? tw`bg-primary-100 text-white`
          : tw``,
        selectedStart && tw`rounded-l-md`,
        selectedEnd && tw`rounded-r-md`,
      ]}
    >
      <Typography.Caption
        containerCss={
          !selectedEnd && !selectedStart
            ? [
                tw`text-inherit`,
                val <= 9 ? tw`px-2 py-0.5` : tw`py-0.5 px-1`,
                isSelected && tw`bg-primary-100 text-white rounded-full`,
                !isDisabled
                  ? tw`cursor-pointer hover:(bg-primary-100 text-white rounded-full)`
                  : tw`cursor-default text-gray-300`,
                !isInActiveMonth && tw`text-gray-300`,
              ]
            : [tw`text-inherit`]
        }
      >
        {val}
      </Typography.Caption>
    </button>
  );
};
