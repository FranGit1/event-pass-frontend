import invariant from 'invariant';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';
import { IComponentBaseProps } from '../../types';
import { FloatingContent } from '../layout/FloatingContent';
import { Typography } from '../Typography';

export interface IInfoItem {
  label: string;
  iconUrl?: string;
  url?: string;
  externalUrl?: string;
  onClick?(): void;
}
export interface IInfoProps extends IComponentBaseProps {
  initialOpen?: boolean;
  title?: string;
  text?: string;
}
export const InfoPopup = (props: PropsWithChildren<IInfoProps>) => {
  invariant(props.children, 'Children must be specified');

  return (
    <FloatingContent
      openOnHover
      containerCss={[tw`focus-visible:outline-0 z-50`]}
      placement="bottom"
      offset={0}
      xOffset={-180}
      renderContent={(__: any, { setOpen }: any) => (
        <div css={[props.containerCss, tw`p-6 w-92 bg-primary-800 rounded-lg `]}>
          <div css={[tw`flex justify-between items-center mb-4`]}>
            {props.title && <Typography.H2 containerCss={[tw`mr-6`]}>{props.title}</Typography.H2>}
          </div>
          <Typography.Caption containerCss={[tw`text-white`]}>{props?.text}</Typography.Caption>
        </div>
      )}
    >
      {
        ((open: boolean) => {
          const children =
            typeof props.children === 'function'
              ? // @ts-ignore
                props.children(open)
              : props.children;
          return children;
        }) as any
      }
    </FloatingContent>
  );
};
