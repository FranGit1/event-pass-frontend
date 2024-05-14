// import "twin.macro";

import { Chip, IChipProps } from '../../buttons/Chip';
import { IComponentBaseProps, Maybe } from '../../../types';

import { Typography } from '../../Typography';
import { formatDate, mapStatusToColor } from '../../../utils';
import tw from 'twin.macro';

interface ITextCellProps extends IComponentBaseProps {
  value: Maybe<string>;
  leadSvg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const TextCell = (props: ITextCellProps) => {
  const { value, leadSvg: LeadSvg } = props;

  const isEmpty = value == null || value.trim() === '';
  return (
    <Typography.Body containerCss={[props.containerCss, tw`text-black flex flex-row`]}>
      {LeadSvg ? <LeadSvg /> : null}
      {!isEmpty ? value : 'N/A'}
    </Typography.Body>
  );
};

interface IAvailabilityCellProps extends IComponentBaseProps {
  value: any;
}

const AvailabilityCell = (props: IAvailabilityCellProps) => {
  return (
    <div
      className={`w-2 h-2 flex ml-4 rounded-full ${mapStatusToColor(props.value)}`}
      css={[[props.containerCss]]}
      title={`Availability: ${props.value}`}
    />
  );
};

interface INumberCellProps extends IComponentBaseProps {
  value: Maybe<number>;
  leadSvg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const NumberCell = (props: INumberCellProps) => {
  const { value, leadSvg: LeadSvg } = props;
  const isEmpty = value == null;
  return (
    <Typography.Body
      containerCss={[
        props.containerCss,
        tw`text-black text-start  flex flex-row items-center justify-items-start	gap-x-1`
      ]}
    >
      {LeadSvg ? <LeadSvg /> : null}
      {!isEmpty ? value : 'N/A'}
    </Typography.Body>
  );
};

interface IDateCellProps extends IComponentBaseProps {
  value: Maybe<Date>;
  dateFormat?: string;
}

const DateCell = (props: IDateCellProps) => {
  const { value } = props;
  const isEmpty = value == null;
  const dateFormat = props.dateFormat ?? 'yyyy-MM-dd';
  return (
    <Typography.Body containerCss={[props.containerCss]}>
      {!isEmpty ? formatDate(value, { dateFormat }) : 'N/A'}
    </Typography.Body>
  );
};

interface IYesNoCellProps extends IComponentBaseProps {
  value: Maybe<boolean>;
}

const YesNoCell = (props: IYesNoCellProps) => {
  const { value } = props;
  const isEmpty = value == null;
  return (
    <Typography.Body containerCss={[props.containerCss]}>{!isEmpty ? (value ? 'Yes' : 'No') : 'N/A'}</Typography.Body>
  );
};

interface IChipCellProps extends IComponentBaseProps {
  value: Maybe<string>;
  type: IChipProps['type'];
}

const ChipCell = (props: IChipCellProps) => {
  const { value, type } = props;
  const isEmpty = value == null || value.trim() === '';
  if (isEmpty) {
    return <Typography.Body containerCss={[props.containerCss]}>N/A</Typography.Body>;
  }
  return <Chip containerCss={[props.containerCss]} type={type} value={value} />;
};

interface ICurrencyCellProps extends IComponentBaseProps {
  value: Maybe<number>;
}

const CurrencyCell = (props: ICurrencyCellProps) => {
  const { value } = props;
  const isEmpty = value == null;
  const formattedValue = !isEmpty
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(value)
    : 'N/A';

  return <Typography.Body containerCss={[props.containerCss]}>{formattedValue}</Typography.Body>;
};

interface IPercentageCellProps extends IComponentBaseProps {
  value: Maybe<number>;
}

const PercentageCell = (props: IPercentageCellProps) => {
  const { value } = props;
  const isEmpty = value == null;

  return <Typography.Body containerCss={[props.containerCss]}>{!isEmpty ? `${value}%` : 'N/A'}</Typography.Body>;
};
export const TableCell = {
  Text: TextCell,
  Number: NumberCell,
  Date: DateCell,
  YesNo: YesNoCell,
  Chip: ChipCell,
  Currency: CurrencyCell,
  Percentage: PercentageCell,
  Availability: AvailabilityCell
};
