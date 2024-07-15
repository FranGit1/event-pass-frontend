import { ArrayInterpolation, Theme } from "@emotion/react";

import { HTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface IComponentBaseProps {
  containerCss?: Maybe<TwinStyle>;
}
export interface IFieldComponentBaseProps<T> extends IComponentBaseProps {
  value: T;
  onChange(value: T | null): void;
  error?: Maybe<string>;
  label?: Maybe<string>;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}
export interface IMultiFieldComponentBaseProps<T> extends IComponentBaseProps {
  value: T[];
  onChange(value: T[]): void;
  error?: Maybe<string>;
  label?: Maybe<string>;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

export interface IFormFieldComponentBaseProps extends IComponentBaseProps {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange?(value: any): void;
}

export interface IOption<T> {
  label: string;
  value: T;
}

export type ThreeStateBoolean = true | false | undefined;

export type Maybe<K> = K | null | undefined;

export type Nullable<T> = {
  [P in keyof T]?: Maybe<T[P]>;
};

export enum Breakpoint {
  XS_2 = "XS_2",
  XS = "XS",
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL",
  XL_2 = "XL_2",
}

export type TwinStyle = ArrayInterpolation<Theme>;
export type Icon = IconType;

export interface VariantProps {
  variant?: "primary" | "secondary";
}
export type ReactComponent<P> = (
  props: HTMLAttributes<any> & IComponentBaseProps & P
) => JSX.Element;

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  slug?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export type Organization = {
  id: number;
  title: string;
  organizer: string;
  slug: string;
  organizerDescription: string | null;
  organizerFacebook: string | null;
  organizerEmail: string | null;
  organizerLink: string | null;
  organizerInstagram: string | null;
};

type EventLocation = {
  city: string;
  country: string;
  name: string;
  latitude: string;
  longitude: string;
};

export type CreateEventDto = {
  description: string;
  displayInSlider: boolean;
  endDate: Date;
  featuredImage: string;
  keywords: string;
  location: EventLocation;
  price: string;
  sliderPosition: number;
  startDate: Date;
  title: string;
  topicId: number;
};
