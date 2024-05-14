import { IComponentBaseProps } from '../../types';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

type IBaseCardProps = IComponentBaseProps;

const BaseCard = (props: PropsWithChildren<IBaseCardProps>) => {
  return <div css={[tw`p-4 rounded-sm bg-white mb-4 flex flex-col`, props.containerCss]}>{props.children}</div>;
};

interface ICardProps extends IBaseCardProps {
  hideShadow?: boolean;
}

export const Card = {
  Elevated: (props: PropsWithChildren<ICardProps>) => {
    return (
      <BaseCard containerCss={[tw`shadow-cardTop`, props.hideShadow && tw`shadow-none`, props.containerCss]}>
        {props.children}
      </BaseCard>
    );
  },
  Outlined: (props: PropsWithChildren<ICardProps>) => {
    return <BaseCard containerCss={[tw`border-1 border-gray-100`, props.containerCss]}>{props.children}</BaseCard>;
  }
};
