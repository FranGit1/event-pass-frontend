import invariant from 'invariant';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { IComponentBaseProps } from '../../types';
import { onKeyDownA11Y } from '../../utils';
import { FloatingContent } from '../layout/FloatingContent';
import { Typography } from '../Typography';

export interface IMenuItem {
  label: string;
  iconUrl?: string;
  url?: string;
  externalUrl?: string;
  onClick?(): void;
}
export interface IMenuProps extends IComponentBaseProps {
  initialOpen?: boolean;
  items: IMenuItem[];
  title?: string;
}
export const Menu = (props: PropsWithChildren<IMenuProps>) => {
  invariant(props.children, 'Children must be specified');
  const navigate = useNavigate();

  return (
    <FloatingContent
      containerCss={[tw`focus-visible:outline-0 z-50`]}
      placement="bottom"
      offset={0}
      xOffset={110}
      renderContent={(__: any, { setOpen }: any) => (
        <div
          css={[
            props.containerCss,
            tw`p-6 bg-white rounded-l-3xl rounded-tl-3xl rounded-bl-3xl rounded-br-3xl border border-primary-100 flex-col justify-center items-start inline-flex`
          ]}
        >
          <div css={[tw`flex justify-between items-center mb-4`]}>
            {props.title && <Typography.H2 containerCss={[tw`mr-6`]}>{props.title}</Typography.H2>}
            <img css={[tw`w-6 h-6 cursor-pointer`]} src="../svg/close.svg" alt="Close" onClick={() => setOpen(false)} />
          </div>
          {props.items.map((item, index) => {
            invariant(item.onClick || item.url || item.externalUrl, 'Either url or onClick must be specified');

            return (
              <button
                key={index}
                css={[
                  tw`text-primary-100 text-left w-full`,
                  tw`hover:(bg-primary-400 text-primary)`,
                  tw`focus-visible:(bg-primary-400 text-primary outline-none)`
                ]}
                onKeyDown={onKeyDownA11Y({ close: () => setOpen(false) })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.url) {
                    navigate(item.url);
                  } else {
                    window.open(item.externalUrl);
                  }
                  // setOpen(false);
                }}
              >
                <Typography.Body containerCss={[tw`text-gray-200 flex gap-3`, tw`cursor-pointer py-1`]}>
                  {item.iconUrl && <img src={item?.iconUrl} alt="icon" />} {item.label}
                </Typography.Body>
              </button>
            );
          })}
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
