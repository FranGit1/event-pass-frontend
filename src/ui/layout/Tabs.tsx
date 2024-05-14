import React, {
  FocusEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { IconType } from 'react-icons';
import tw from 'twin.macro';
import { IComponentBaseProps, Maybe, TwinStyle } from '../../types';
import { Chip } from '../buttons/Chip';
import { Typography } from '../Typography';

interface ITabItemProps extends IComponentBaseProps {
  text: string;
  index: number;
  trail?: IconType;
  lead?: IconType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLast: boolean;
  isSelected: boolean;
  isFirst: boolean;
  tabFullWidth?: boolean;
  onFocus?: FocusEventHandler<any> | undefined;
  notificationNumber?: number;
  hideBorderBottom?: boolean;
}

const horizontalMargin = 15;

export type ITabItemPropsPublic = Omit<
  ITabItemProps,
  'onClick' | 'isLast' | 'isFirst' | 'onFocus' | 'isSelected' | 'index'
>;

const TabItem = (props: ITabItemProps) => {
  const Lead = props.lead;
  const Trail = props.trail;
  return (
    <button
      className="group"
      css={[
        tw`flex flex-row items-center justify-center outline-none relative whitespace-nowrap`,
        tw`px-1 md:px-3 pb-2 mt-4.5 mr-2!`,
        tw`duration-200`,
        // tw`border-b-4 border-b-gray-light rounded-b  hover:(border-b-primary)`,
        !props.isSelected && tw`hover:(border-b-primary)`,
        props.isSelected && tw`border-b-primary`,
        props.tabFullWidth && tw`w-1/2`,
        tw`cursor-pointer text-gray`
      ]}
      style={{ marginRight: horizontalMargin }}
      onClick={(e) => {
        e.preventDefault();
        props.onClick(e);
      }}
      onFocus={props.onFocus}
    >
      {Lead && <Lead tw="mr-2 w-4 h-4" />}
      <Typography.ButtonPrimary
        containerCss={[
          tw`font-400 text-sm md:text-body group-hover:(text-primary) transition-colors duration-300 ease-in-out`,
          props.isSelected && tw`text-primary`
        ]}
      >
        {props.text}
      </Typography.ButtonPrimary>
      {!!props.notificationNumber && Number(props.notificationNumber) > 0 && (
        <Chip
          value={props.notificationNumber}
          //@ts-ignore
          type="blue-invert"
          textCss={[!props.isSelected && tw`text-gray-800`]}
          containerCss={[tw`ml-2`, !props.isSelected && tw`bg-gray-100`]}
        />
      )}
      {Trail && <Trail tw="ml-2 w-4 h-4" />}
      {props.isSelected && <div tw="bg-primary h-1 w-full absolute bottom-[-0.234rem] rounded-full" />}
      {!props.isSelected && !props.hideBorderBottom && (
        <div tw="bg-gray-light h-1 w-full absolute bottom-[-0.234rem] rounded-full group-hover:(bg-primary) transition-colors duration-300 ease-in-out" />
      )}
    </button>
  );
};

export interface ITabsProps extends IComponentBaseProps {
  defaultTab?: number;
  onTabChange?: (index: number) => void;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
  showTabOnTop?: boolean;
  showTabsCenter?: boolean;
  centerTabs?: boolean;
  tabItemCss?: Maybe<TwinStyle>;
  componentWrapperCss?: Maybe<TwinStyle>;
}

const Tabs: React.FC<PropsWithChildren<ITabsProps>> & {
  Item: React.FC<PropsWithChildren<ITabItemPropsPublic>>;
} = (props) => {
  const { onTabChange, leftComponent, rightComponent } = props;
  const [activeIndex, setActiveIndex] = useState(props.defaultTab ?? 0);
  const [lineAtIndex, setLineAtIndex] = useState(props.defaultTab ?? 0);
  const [tabWidths, setTabWidth] = useState<Array<number>>([]);
  const tabRef = useRef<HTMLDivElement>(null);

  const onChange = useCallback(
    (value: number) => {
      setActiveIndex(value);
      setLineAtIndex(value);
      onTabChange && onTabChange(value);
    },
    [setActiveIndex, setLineAtIndex, onTabChange]
  );
  const children = React.Children.toArray(props.children);
  const tabs =
    React.Children.map(children, (child: any, index: number) =>
      React.cloneElement(child, {
        isFirst: index === 0,
        isSelected: index === activeIndex,
        isLast: index + 1 === children.length,
        index,
        onClick: () => onChange(index),
        onFocus: () => setLineAtIndex(index)
      })
    ) ?? [];

  const components = children.map((c: any) => c.props.children);

  useEffect(() => {
    const tabWidthsInside = Array.from(tabRef?.current?.children ?? []).map((c) => c.clientWidth);
    if (tabWidths.length !== tabWidthsInside.length) {
      setTabWidth(tabWidthsInside);
    }
  }, [tabWidths.length]);

  const totalWidth =
    tabWidths
      .filter((_, i) => i < lineAtIndex)
      .reduce((prev, curr) => {
        return prev + curr + horizontalMargin;
      }, 0) ?? 0;

  return (
    <div css={props.containerCss}>
      {!props.showTabOnTop &&
        components.map((c, i) => {
          return (
            activeIndex == i && (
              <div key={i} css={[tw`h-fit my-12 px-12`, props.componentWrapperCss]}>
                {c}
              </div>
            )
          );
        })}
      <div
        css={[
          tw`flex flex-col items-center justify-between h-14 max-w-screen-xl m-auto`,
          props.showTabOnTop && tw`items-start ml-0`,
          props.showTabsCenter && tw`items-center ml-0`,
          props.containerCss,
          tw`lg:pl-5 pr-5`,
          tw`xl:pl-0 pr-0`
        ]}
      >
        {leftComponent}
        {/*  add w-full is layout breaks when centering tabs */}

        <div css={[props.showTabsCenter && tw`w-full`]}>
          <div ref={tabRef} css={[tw`flex flex-row items-center justify-between `]}>
            {tabs}
          </div>
          <div
            css={[tw``]}
            style={{
              transform: `translateX(${totalWidth}px)`,
              width: tabWidths[lineAtIndex] ?? 0
            }}
          />
        </div>
        {rightComponent || <div css={[tw`w-1 h-1 bg-transparent`]}></div>}
      </div>

      {props.showTabOnTop &&
        components.map((c, i) => {
          return (
            activeIndex == i && (
              <div key={i} css={[tw`h-fit p-0 pb-0 pt-6 md:p-12`, props.showTabsCenter && tw`md:px-0`]}>
                {c}
              </div>
            )
          );
        })}
    </div>
  );
};

// @ts-ignore
Tabs.Item = TabItem;
export { Tabs };
