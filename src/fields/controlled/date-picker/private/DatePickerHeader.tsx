import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { IComponentBaseProps } from "../../../../types";
import { Typography } from "../../../../ui/Typography";
import { addMonths } from "date-fns";
import { monthToName } from "./utils";
import tw from "twin.macro";


export interface IDatePickerHeaderProps extends IComponentBaseProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DatePickerHeader = (props: IDatePickerHeaderProps) => {
  const { value, onChange } = props;

  const iconStyle = tw`cursor-pointer w-6 h-6 text-primary-100  hover:(bg-primary-300 rounded-full)`;

  return (
    <div css={[tw`flex flex-row justify-between items-center mx-1 mb-2`]}>
      <HiChevronLeft
        css={[iconStyle]}
        onClick={() => onChange(addMonths(value, -1))}
      />

      <div css={[tw`flex flex-row justify-center gap-x-2 items-center`]}>
        <Typography.Caption>{monthToName(value.getMonth())}</Typography.Caption>
        <Typography.Caption>{value.getFullYear()}</Typography.Caption>
      </div>
      <HiChevronRight
        css={[iconStyle]}
        onClick={() => onChange(addMonths(value, 1))}
      />
    </div>
  );
};
