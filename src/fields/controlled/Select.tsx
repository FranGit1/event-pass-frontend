import { FocusEventHandler, useCallback } from "react";
import { HiChevronDown, HiChevronUp, HiSearch } from "react-icons/hi";
import { IFieldComponentBaseProps, IOption, Maybe } from "../../types";

import ReactSelect, {
  components as Components,
  ControlProps,
  IndicatorsContainerProps,
  InputProps,
  MenuListProps,
  MenuProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";

import { AiFillCloseCircle } from "react-icons/ai";
import { FieldLabel } from "../components/FieldLabel";
import { Typography } from "../../ui/Typography";
import { addAsterisk } from "../../utils";
import { css } from "@emotion/react";
import tw from "twin.macro";

const CustomMenuList = (props: MenuListProps) => {
  const {
    selectOption,
    selectProps: { value, inputValue, isSearchable },
  } = props;
  const options = props.options as unknown as IOption<any>[];
  const selectedOption = value as IOption<any>;
  const term = (inputValue ?? "").toLowerCase().trim();
  const filteredOptions = isSearchable
    ? options.filter(({ label }: IOption<any>) => {
        return label.toLowerCase().trim().includes(term);
      })
    : options;
  return (
    <Components.MenuList {...props} tw="shadow-none">
      {filteredOptions.length === 0 ? (
        <div tw="cursor-auto">
          <Typography.Caption containerCss={[tw`text-gray-100 py-1 px-3`]}>
            No results
          </Typography.Caption>
        </div>
      ) : (
        <div css={[tw`cursor-pointer `]}>
          {filteredOptions.map((o: IOption<any>) => {
            const isSelected = o.value === selectedOption?.value;

            return (
              <div
                className="group"
                css={[
                  tw`px-3 py-1`,
                  tw`bg-white text-gray-400`,
                  tw`hover:(text-primary border-l-3)`,
                  isSelected &&
                    tw`bg-primary text-white  hover:(bg-primary text-white)`,
                ]}
                key={o.value}
                onClick={() => selectOption(o)}
              >
                <Typography.Caption containerCss={[tw`text-inherit`]}>
                  {o.label}
                </Typography.Caption>
              </div>
            );
          })}
        </div>
      )}
    </Components.MenuList>
  );
};
const CustomPlaceholder = (props: PlaceholderProps) => {
  return (
    <Typography.Caption
      containerCss={[
        css`
          grid-area: 1/1/2/3;
          ${tw`text-black overflow-hidden ml-0.5`}
          ${props.selectProps.isDisabled && tw`text-gray-100`}
          ${props.isFocused && tw`text-gray-100`}
        `,
      ]}
    >
      {props.selectProps.placeholder}
    </Typography.Caption>
  );
};

const CustomIndicatorsContainer = (props: IndicatorsContainerProps) => {
  const {
    clearValue,
    hasValue,

    selectProps: { menuIsOpen, isClearable },
  } = props;

  const DropdownIcon = menuIsOpen ? HiChevronUp : HiChevronDown;

  const showClear = isClearable && hasValue;

  return (
    <div css={[tw`flex flex-row items-center gap-x-2`]} {...props.innerProps}>
      {showClear && (
        <AiFillCloseCircle
          onMouseDown={(e: any) => {
            e.stopPropagation();
          }}
          onClick={clearValue}
          css={[
            tw`h-6 w-6 text-gray cursor-pointer`,
            props.selectProps.isDisabled && tw`text-gray-100`,
          ]}
        />
      )}
      <DropdownIcon
        css={[
          tw`h-6 w-6 text-gray-400`,
          props.selectProps.isDisabled && tw`text-gray-100`,
        ]}
      />
    </div>
  );
};
const CustomInput = (props: InputProps) => {
  return <Components.Input {...props} tw="m-0 p-0" />;
};

const CustomSingleValue = (props: SingleValueProps) => {
  const {
    selectProps: { value, isDisabled, isOptionSelected },
  } = props;
  const selectedOption = value as IOption<any>;

  return (
    <Typography.Caption
      containerCss={[
        css`
          grid-area: 1/1/2/3;
          ${tw`text-primary-400 overflow-hidden ml-0.5`}
          ${isDisabled && tw`text-gray-100`}
          ${isOptionSelected && tw`text-primary`}
        `,
      ]}
    >
      {selectedOption?.label}
    </Typography.Caption>
  );
};
const CustomControl = ({
  children,
  ...props
}: ControlProps & { error: Maybe<string> }) => {
  const { error, isFocused } = props;

  return (
    <Components.Control
      {...props}
      css={[
        tw`border-2 rounded-full px-5 py-3 hover:(border-2 border-primary)`,
        isFocused && tw`border-primary`,
        error && tw`border-error ring-error-light ring-2 hover:(border-error)`,
        props.isDisabled &&
          tw`bg-white border-1 border-gray hover:(bg-gray) cursor-not-allowed`,
      ]}
    >
      {/* <HiSearch  css={[
        tw`mr-4 text-gray-300`,
        isFocused &&
        tw`text-gray-300`,
        props.isDisabled &&

          tw`text-gray`,
      ]} /> */}
      {children}
    </Components.Control>
  );
};

interface ISelectProps<T> extends IFieldComponentBaseProps<IOption<T>> {
  autofocus?: boolean;
  options: IOption<T>[];
  onFocus?: FocusEventHandler<any> | undefined;
  onBlur?: FocusEventHandler<any> | undefined;
}

export const Select = <T extends Object>(props: ISelectProps<T>) => {
  const { error } = props;

  const CustomControlMemo = useCallback(
    (props: ControlProps) => <CustomControl {...props} error={error} />,
    [error]
  );
  const CustomValueContainerMemo = useCallback(
    (props: ValueContainerProps) => (
      <Components.ValueContainer {...props} tw="p-0 m-0" />
    ),
    []
  );
  const CustomMenuMemo = useCallback(
    (props: MenuProps) => (
      <Components.Menu {...props} tw="shadow-menu rounded-md z-10" />
    ),
    []
  );

  return (
    <div css={[props.containerCss]}>
      <FieldLabel
        isInErrorState={!!props.error}
        containerCss={[tw`mb-0.5`, props.disabled && tw`text-gray`]}
      >
        {addAsterisk(props.label, props.required, !!props.error)}
      </FieldLabel>
      <ReactSelect
        classNamePrefix="react-select"
        value={props.value}
        isClearable={false}
        isSearchable
        autoFocus={props.autofocus}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        isDisabled={props.disabled}
        onChange={(option) => props.onChange(option as IOption<T>)}
        placeholder={props.placeholder}
        options={props.options as any}
        styles={
          // STATEMENT: How do I override specific style?
          // Since we override specific components in this template some of the
          // options provided in the "styles" object may not work.
          // It's discouraged to use this object. Please use component override.
          {
            // input: (provided) => ({
            //   ...provided,
            //   "input:focus": {
            //     boxShadow: "none",
            //   },
            // }),
          }
        }
        // STATEMENT: How these overrides work?
        // Find here more: https://react-select.com/components
        // If you have any problem overriding any property, it may be best to
        // directly check the source here: https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Select.tsx
        components={{
          // @ts-ignore
          Control: CustomControlMemo,
          // @ts-ignore
          ValueContainer: CustomValueContainerMemo,
          // @ts-ignore
          SingleValue: CustomSingleValue,
          // @ts-ignore
          Placeholder: CustomPlaceholder,
          // @ts-ignore
          IndicatorsContainer: CustomIndicatorsContainer,
          // @ts-ignore
          Input: CustomInput,
          // @ts-ignore
          MenuList: CustomMenuList,
          // @ts-ignore
          Menu: CustomMenuMemo,
          // SelectContainer: (props) => {
          //   return <Components.SelectContainer {...props} />;
          // },
          // MenuPortal: (props) => {
          //   return <Components.MenuPortal {...props} />;
          // },
          // // NOT VISIBLE SINCE MENU LIST IS OVERRIDDEN
          // NoOptionsMessage: (props) => {
          //   return <Components.NoOptionsMessage {...props} />;
          // },
          // // NOT VISIBLE SINCE MENU LIST IS OVERRIDDEN
          // Option: (props) => {
          //   return <Components.Option {...props} />;
          // },
          // // NOT USED SINCE ALL OPTIONS ARE STATIC
          // LoadingMessage: (props) => {
          //   return <Components.LoadingMessage {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // ClearIndicator: (props) => {
          //   return <Components.ClearIndicator {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // DropdownIndicator: (props) => {
          //   return <Components.DropdownIndicator {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // LoadingIndicator: (props) => {
          //   return <Components.LoadingIndicator {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // IndicatorSeparator: (props) => {
          //   return <Components.IndicatorSeparator {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // CrossIcon: (props) => {
          //   return <Components.CrossIcon {...props} />;
          // },
          // // NOT VISIBLE SINCE INDICATORS CONTAINER IS OVERRIDDEN
          // DownChevron: (props) => {
          //   return <Components.DownChevron {...props} />;
          // },
        }}
      />
    </div>
  );
};
