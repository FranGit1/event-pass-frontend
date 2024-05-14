import { format } from "date-fns";
import React, { FunctionComponent, SVGProps } from "react";
import tw from "twin.macro";
import { Maybe } from "../types";

export const errorMessageStrings = {
  passwordRequired: "passwordRequiredError",
  passwordBadFormat: "passwordBadFormatError",
  emailRequired: "emailRequiredError",
  emailBadFormat: "emailBadFormat",
  firstNameRequired: "firstNameRequiredError",
  lastNameRequired: "lastNameRequiredError",
  repeatPasswordRequired: "repeatPasswordRequiredError",
  repeatPasswordMustMatch: "repeatPasswordMustMatchError",
  messageRequired: "messageRequiredError",
};

export function addAsterisk(
  label?: Maybe<string>,
  required?: boolean,
  error?: Maybe<boolean>
): JSX.Element | null {
  if (!label) {
    return null;
  } else if (!required) {
    return <span>{label}</span>;
  } else {
    return (
      <span>
        {label}
        <span css={[tw`text-primary`, error && tw`text-black`]}>*</span>
      </span>
    );
  }
}

interface IFormatDateOptions {
  dateFormat?: string;
  uppercase?: boolean;
}

export function formatDate(date: Date, options?: IFormatDateOptions) {
  const { dateFormat = "yyyy-MM-dd", uppercase = false } = options || {};
  const startDate = format(date, dateFormat);

  return uppercase ? startDate.toUpperCase() : startDate;
}

export function getInitialsFromName(name: string) {
  const allNames = name.trim().split(" ");
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, "");
  return initials;
}

export function onKeyDownA11Y(options: {
  open?: any;
  close?: any;
}): React.KeyboardEventHandler {
  const { open, close } = options;
  return (e) => {
    if ([" ", "Enter"].includes(e.key)) {
      return open && open();
    } else if (["Escape"].includes(e.key)) {
      return close && close();
    }
  };
}
export function onMouseOverA11Y(options: {
  open?: any;
  close?: any;
}): React.MouseEventHandler {
  const { open, close } = options;
  return (e) => {
    if (e.type === "mouseover") {
      return open && open();
    } else if (e.type === "mouseleave") {
      return close && close();
    }
  };
}

export function formatPrice(price: number) {
  return price.toLocaleString("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
  });
}

export type SidebarItem = {
  url: string;
  icons?: {
    unselected: FunctionComponent<SVGProps<SVGSVGElement>>;
  };
  label: string;
};
