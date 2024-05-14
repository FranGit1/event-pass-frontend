import { HTMLAttributeAnchorTarget, MouseEventHandler, PropsWithChildren } from 'react';
import tw from 'twin.macro';
import { IComponentBaseProps } from '../types';

interface IBaseTypographyProps extends IComponentBaseProps {
  element?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'label';
  onClick?: MouseEventHandler<any>;
}

const BaseTypography = (props: PropsWithChildren<IBaseTypographyProps>) => {
  const Component = props.element ?? 'span';
  return (
    <Component
      // STATEMENT: display: block style is used on span and label tags.
      // Unfortunately by default inline tags don't allow top and bottom margin.
      // Look here for more info: https:///tackoverflow.com/questions/11700985/margin-top-not-working-for-span-element
      // Although we could pick inline-block display, seems that the most UI frameworks render one text per line which
      // leaves us with only one valid option. (display: block).
      css={[tw`font-inter text-black block`, props.containerCss]}
      onClick={props.onClick}
    >
      {props.children}
    </Component>
  );
};

export type ITypographyProps = IBaseTypographyProps;

export type ILinkProps = PropsWithChildren<
  IComponentBaseProps & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    target?: HTMLAttributeAnchorTarget | undefined;
  }
>;

export const Typography = {
  H1: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-h1 font-medium -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'h1'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  H2: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-h2 font-medium -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'h2'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  H3: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-h3 font-medium -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'h3'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Subtitle: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-subtitle font-normal -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'span'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Notice: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-sm font-normal -tracking-0.03 text-gray`, props.containerCss]}
        element={props.element ?? 'p'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Meta: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-meta text-primary font-normal -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'span'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Body: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-body font-normal -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'p'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  FooterText: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-body font-normal -tracking-0.03 text-gray`, props.containerCss]}
        element={props.element ?? 'p'}
      >
        {props.children}
      </BaseTypography>
    );
  },

  ButtonPrimary: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-button -tracking-0.015 font-medium`, props.containerCss]}
        element={props.element ?? 'span'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  ButtonSecondary: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-button text-primary font-medium -tracking-0.015`, props.containerCss]}
        element={props.element ?? 'span'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Link: (props: ILinkProps) => {
    return (
      <a
        href={props.href}
        css={[tw`text-link text-primary font-semibold -tracking-0.015 underline cursor-pointer`, props.containerCss]}
        tabIndex={0}
        role={!props.href ? 'button' : undefined}
        target={props.target}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  },
  InputLabel: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-body font-400 -tracking-0.03 text-black`, props.containerCss]}
        element={props.element ?? 'p'}
      >
        {props.children}
      </BaseTypography>
    );
  },
  Caption: (props: PropsWithChildren<ITypographyProps>) => {
    return (
      <BaseTypography
        {...props}
        containerCss={[tw`text-subtitle font-normal -tracking-0.03`, props.containerCss]}
        element={props.element ?? 'span'}
      >
        {props.children}
      </BaseTypography>
    );
  }
};
