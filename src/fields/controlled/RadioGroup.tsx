import { IFieldComponentBaseProps, IOption, Maybe, TwinStyle } from '../../types';

import tw from 'twin.macro';
import { useId } from 'react';

export type IRadioGroupProps = Omit<IFieldComponentBaseProps<IOption<string | boolean>>, 'placeholder'> & {
  options: IOption<string | boolean>[];
  flexDirectionCss?: Maybe<TwinStyle>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const RadioGroup = (props: IRadioGroupProps) => {
  const id = useId();
  const option = props.value;
  return (
    <div css={[tw`flex flex-col md:flex-row gap-x-4.75`, props.containerCss]}>
      {props.options.map((o, i) => {
        return (
          <div
            key={i}
            css={[tw`flex flex-col gap-y-4 items-start p-4 border border-primary-100`, props.flexDirectionCss]}
            onClick={(_) => {
              props.onChange(o);
              if (o.label === 'Po izboru' && props.setOpen) {
                props.setOpen(true);
              }
            }}
          >
            <input
              id={id}
              // @ts-ignore
              value={o.value}
              type="radio"
              checked={o.value === option.value}
              onChange={(_) => props.onChange(o)}
              disabled={props.disabled ?? false}
              css={[
                tw`appearance-none h-4 w-4 border-3 border-transparent rounded-full cursor-pointer ring-2 ring-primary-100 mr-24`,
                tw`checked:(bg-primary-100 border-white)`,
                tw`hover:(ring-primary checked:bg-primary )`,
                tw`disabled:(ring-gray-300 border-white cursor-not-allowed)`,
                tw`disabled:checked:(bg-gray-300)`,
                props.error && tw`ring-error`
              ]}
            />
            <label css={[tw`text-primary-800`]}>{o.label}</label>
          </div>
        );
      })}
    </div>
  );
};
