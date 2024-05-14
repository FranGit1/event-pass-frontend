import { IComponentBaseProps, Maybe, TwinStyle } from '../../types';
import {
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react-dom-interactions';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { OutsideClick } from '../../components/OutsideClick';
import { onKeyDownA11Y } from '../../utils';
import tw from 'twin.macro';
import { useBoolean } from '../../hooks/use-boolean';

export interface IFloatingContentProps extends IComponentBaseProps {
  renderContent: any;
  placement?: Placement;
  offset?: number;
  xOffset?: number;
  arrowSize?: number;
  arrowColor?: string;
  arrowCss?: Maybe<TwinStyle>;
  withArrow?: boolean;
  openOnHover?: boolean;
  closeOnClick?: boolean;
}
export const FloatingContent = (props: PropsWithChildren<IFloatingContentProps>) => {
  const [open, { off, on, toggle, setState: setOpen }] = useBoolean(false);

  const arrowElement = useRef<any>();
  const {
    x,
    y,
    reference: trigger,
    floating,
    strategy,
    placement,
    context,
    refs: { floating: floatingRef },
    middlewareData: { arrow: arrowData }
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: props.placement ?? 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [offset(props.offset ?? 0), flip(), arrow({ element: arrowElement! })]
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: !!props.openOnHover,
      handleClose: safePolygon()
    })
  ]);

  useEffect(() => {
    if (open && floatingRef) {
      // TODO THIS CAUSES TOOLTIP OUTLINE TO BE VISIBLE
      floatingRef.current?.focus();
    }
  }, [open, floatingRef]);

  const side = placement.split('-')[0];
  const arrowStaticSide: any = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[side];

  const arrowBorderColorSide: any = {
    top: ['borderBottomColor', 'borderRightColor'],
    right: ['borderLeftColor', 'borderBottomColor'],
    bottom: ['borderTopColor', 'borderLeftColor'],
    left: ['borderRightColor', 'borderTopColor']
  }[side];

  const arrowShadow: any = {
    top: tw`shadow-arrow-bottom`,
    bottom: tw`shadow-arrow-top`,
    left: tw`shadow-arrow-right`,
    right: tw`shadow-arrow-left`
  }[side];

  const arrowSize = props.arrowSize ?? 10;
  const closeOnClick = props.closeOnClick ?? true;

  const children =
    typeof props.children === 'function'
      ? // @ts-ignore
        props.children(open)
      : props.children;

  return (
    // STATEMENT: Why do we need nested on click handlers?
    // Outside click handler enables you to open a menu by clicking on a trigger
    // Inner click handler closes the menu if you click outside the menu.
    <div onClick={closeOnClick ? () => toggle() : undefined}>
      <OutsideClick onOutsideClick={() => (closeOnClick ? off() : undefined)}>
        <div ref={trigger} {...getReferenceProps()}>
          {children}
        </div>
        {open && (
          <div>
            <div
              ref={floating}
              role="dialog"
              style={{
                position: strategy,
                // top: y ?? 0,
                left: x && props.xOffset ? x - props.xOffset : 0,
                width: 'max-content'
              }}
              css={[props.containerCss]}
              {...getFloatingProps()}
              onKeyDown={onKeyDownA11Y({ close: () => setOpen(false) })}
            >
              {props.withArrow && (
                <div
                  ref={arrowElement}
                  css={[tw`absolute border-transparent`, arrowShadow, props.arrowCss]}
                  style={{
                    borderWidth: arrowSize,
                    left: arrowData?.x ?? undefined,
                    top: arrowData?.y ?? undefined,
                    [arrowStaticSide]: -arrowSize * 0.6,
                    [arrowBorderColorSide[0]]: props.arrowColor ?? 'white',
                    [arrowBorderColorSide[1]]: props.arrowColor ?? 'white',
                    transform: 'rotate(45deg)'
                  }}
                />
              )}
              <div css={[tw`  overflow-hidden`]}>{props.renderContent(open, { off, on, toggle, setOpen })}</div>
            </div>
          </div>
        )}
      </OutsideClick>
    </div>
  );
};
