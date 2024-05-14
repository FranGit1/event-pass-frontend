import React, { useEffect, useState } from 'react';
import { Feature, IOption, Maybe, TwinStyle } from '../../types';
import tw from 'twin.macro';
import { useId } from 'react';
import { ReactComponent as PlusCircle } from '../../assets/icons/plus-circle.svg';
import { ReactComponent as MinusCircle } from '../../assets/icons/minus-circle.svg';

interface ICheckboxGroupProps {
  options: IOption<string | boolean | Feature>[];
  value: IOption<string | boolean | Feature>[];
  onChange: (selectedOptions: IOption<string | boolean | Feature>[]) => void;
  containerCss?: any; // Adjust the type as needed
  disabled?: boolean;
  error?: boolean;
  counterDisplay?: boolean;
  labelCss?: Maybe<TwinStyle>;
}

export const CheckboxGroup = (props: ICheckboxGroupProps) => {
  const id = useId();
  const handleChange = (selectedOption: IOption<string | boolean | Feature>) => {
    const optionId = selectedOption.value;

    const isOptionSelected = props.value.some((option) => option.value === optionId);

    const updatedOptions = isOptionSelected
      ? props.value.filter((option) => option.value !== optionId)
      : [...props.value, selectedOption];

    if (props.onChange) {
      props.onChange(updatedOptions);
    }
  };

  useEffect(() => {}, [props.value]);
  return (
    <div css={[tw`flex flex-col md:flex-row gap-x-4.75`, props.containerCss]}>
      {props.options.map((o, i) => {
        const isChecked = props.value.some((option) => option.value === o.value);
        const [count, setCount] = useState<number>(0);

        return (
          <div key={i} css={[tw``]} onClick={() => handleChange(o)}>
            <div css={[tw`p-4 border border-primary-100 flex flex-col justify-start h-40`]}>
              <input
                id={`${id}-${i}`}
                //@ts-ignore
                value={o.value}
                type="checkbox"
                checked={isChecked}
                onChange={() => handleChange(o)}
                disabled={props.disabled}
                css={[
                  tw`appearance-none h-5 w-5 border-1 mb-4 border-primary-100 rounded cursor-pointer mr-48`,
                  tw`checked:(border-primary-100 bg-primary)`,
                  tw`focus:(ring-2 ring-primary-400 )`,
                  tw`hover:(border-primary checked:bg-primary)`,
                  tw`disabled:(border-gray-300 bg-gray-300 cursor-not-allowed)`,
                  tw`disabled:checked:(bg-primary-100 opacity-50)`,
                  props.error && tw`border-error`,
                  tw`bg-no-repeat`
                ]}
                style={{
                  backgroundSize: 15,
                  backgroundPositionX: 1,
                  backgroundPositionY: 1.5,
                  backgroundImage: isChecked ? `url(../svg/checkbox.svg)` : 'none'
                }}
              />

              <label css={[tw`text-primary-800 mb-4 w-12`, props.labelCss]}>{o.label}</label>

              {props.counterDisplay && (
                <div tw="flex flex-row justify-between bg-primary-50 rounded-3xl">
                  <MinusCircle
                    onClick={() => {
                      count === 0 ? null : setCount(count - 1);
                    }}
                  />
                  <span tw="text-white"> {count}</span>

                  <PlusCircle onClick={() => setCount(count + 1)} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
