import { IComponentBaseProps } from '../../types';
import { PropsWithChildren } from 'react';
import { Typography } from '../../ui/Typography';
import tw from 'twin.macro';

interface IFieldLabelProps extends IComponentBaseProps {
  disabled?: boolean;
  isInErrorState?: boolean;
}

export const FieldLabel = (props: PropsWithChildren<IFieldLabelProps>) => {
  return (
    <Typography.Meta
      containerCss={[
        props.disabled && tw`text-gray`,
        props.isInErrorState && tw`text-gray`,
        props.containerCss,
        tw`mb-3`
      ]}
      element="label"
    >
      {props.children}
    </Typography.Meta>
  );
};
