import { MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import tw from 'twin.macro';
import { IComponentBaseProps } from '../../types';
import { onKeyDownA11Y } from '../../utils';
import { Typography } from '../Typography';

export interface IChipProps extends IComponentBaseProps {
  value: string | number;
  //@ts-ignore
  type: 'white' | 'black' | 'red' | 'green' | 'blue' | 'yellow' | 'gray';
  onClose?: () => void;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export const Chip = (props: IChipProps) => {
  const clickable = props.onClick;
  const closeable = props.onClose;
  return (
    <div
      onClick={props.onClick}
      onKeyDown={onKeyDownA11Y({ open: props.onClick })}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      css={[
        tw`py-1 px-3.5 rounded-full w-fit inline-flex flex-row items-center gap-2`,
        clickable && tw`cursor-pointer`,
        props.type === 'gray' && tw`bg-gray-300`,
        props.type === 'green' && tw`bg-success`,
        props.type === 'blue' && tw`bg-info`,
        props.type === 'yellow' && tw`bg-warning`,
        props.type === 'red' && tw`bg-error`,
        props.type === 'white' && tw`text-black bg-white border border-gray-300`,
        props.type === 'black' && tw`bg-gray`,
        props.containerCss
      ]}
    >
      <Typography.Caption
        containerCss={[
          tw`inline text-inherit font-400`,
          props.type === 'gray' && tw`text-gray`,
          props.type === 'green' && tw`text-white`,
          props.type === 'blue' && tw`text-white`,
          props.type === 'yellow' && tw`text-black`,
          props.type === 'red' && tw`text-white`,
          props.type === 'white' && tw`text-black`,
          props.type === 'black' && tw`text-white`
        ]}
      >
        {props.value}
      </Typography.Caption>
      {closeable && (
        <AiOutlineClose
          role="button"
          tabIndex={0}
          onKeyDown={onKeyDownA11Y({ open: props.onClose })}
          css={[
            tw`h-4 w-4 cursor-pointer text-inherit`,
            props.type === 'gray' && tw`text-gray`,
            props.type === 'green' && tw`text-white`,
            props.type === 'blue' && tw`text-white`,
            props.type === 'yellow' && tw`text-black`,
            props.type === 'red' && tw`text-white`,
            props.type === 'white' && tw`text-black`,
            props.type === 'black' && tw`text-white`
          ]}
          onClick={(e: any) => {
            e.stopPropagation();
            props.onClose!();
          }}
        />
      )}
    </div>
  );
};
