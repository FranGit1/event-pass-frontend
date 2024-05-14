import { IComponentBaseProps } from '../../types';
import { Typography } from '../../ui/Typography';
import tw from 'twin.macro';
import { useFormError } from '../form/hooks';

interface IFieldErrorProps extends IComponentBaseProps {
  name: string;
  disabled?: boolean;
}

export const FieldError = (props: IFieldErrorProps) => {
  const error = useFormError(props.name);

  return (
    <div className="scrollable-error" css={[tw`min-h-5.25 mt-2.5 mb-2 text-start`, props.containerCss]}>
      {!props.disabled && (
        <Typography.Caption containerCss={[tw`text-sold`, error && tw`pb-4`]}>{error}</Typography.Caption>
      )}
    </div>
  );
};
