import "twin.macro";
import { PropsWithChildren, useRef, useState } from "react";
import React from "react";

import tw from "twin.macro";
import { useAsync } from "react-use";

import { HiX } from "react-icons/hi";
import { Maybe } from "yup";
import { PortalManager } from "../../../components/PortalManager";
import { IComponentBaseProps, TwinStyle } from "../../../types";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { onKeyDownA11Y } from "../../../utils";
import { waitUntilAnimationFinish } from "../../../utils/wailt-until-animation-finish";
import { css } from "@emotion/react";

export interface IModalProps extends IComponentBaseProps {
  open: boolean;
  onClose: () => void;
  onProceed?: () => void;
  onExitButton?: () => void;
  doneButton?: boolean;
  outlinedButton?: boolean;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  buttonCss?: Maybe<TwinStyle>;
  titleCss?: Maybe<TwinStyle>;
  textCss?: Maybe<TwinStyle>;
  containedButtonCss?: Maybe<TwinStyle>;
  modalTitle?: string;
  modalText?: string;
  modalText2?: string;
  modalChildren?: boolean;
  modalChildrenRadio?: boolean;
  hideXButton?: boolean;
}

export const Modal = ({
  doneButton = false,
  outlinedButton,
  modalChildrenRadio = false,
  ...props
}: PropsWithChildren<IModalProps>) => {
  const [softOpen, setSoftOpen] = useState(() => props.open);
  const [hardOpen, setHardOpen] = useState(false);

  const parentRef = useRef();
  const contentRef = useRef();

  useAsync(async () => {
    document.body.ariaHidden = `${props.open}`;
    if (props.open) {
      document.body.style.overflow = "hidden";

      setSoftOpen(true);
      setTimeout(() => {
        setHardOpen(true);
        const element = contentRef.current as any;
        element.focus();
      }, 0);
    } else {
      document.body.style.overflow = "unset";
      setHardOpen(false);
      await waitUntilAnimationFinish(parentRef.current);
      setSoftOpen(false);
    }
  }, [props.open]);

  const onClose = async () => {
    document.body.style.overflow = "unset";
    setHardOpen(false);
    await waitUntilAnimationFinish(parentRef.current);
    setSoftOpen(false);
    props.onClose();
  };
  if (!softOpen) {
    return null;
  }
  const overlayStyles = (hardOpen: any) => css`
    ${tw`flex justify-center items-center`}
    ${tw`fixed left-0 right-0 top-0 bottom-0`}
  ${tw`transition-colors duration-300`}
  ${hardOpen ? "background: rgba(0, 0, 0, 0.6);" : "background: transparent;"}
  `;
  return (
    <PortalManager>
      <div
        aria-hidden={false}
        onClick={onClose}
        // @ts-ignore
        ref={parentRef}
        css={[overlayStyles(hardOpen)]}
      >
        <div
          tabIndex={0}
          role="dialog"
          onKeyDown={onKeyDownA11Y({ close: onClose })}
          onClick={(e) => e.stopPropagation()}
          // @ts-ignore
          ref={contentRef}
          css={[
            tw`md:m-6 md:rounded-3xl relative`,
            tw`bg-white`,
            tw`transition-opacity duration-300`,
            tw`flex justify-center items-center`,
            tw`focus-visible:outline-0`,
            tw`w-[33%]! pb-0!`,
            // tw`md:w-fit md:h-fit w-full h-[calc(100vh)] p-10`,
            hardOpen ? tw`opacity-100` : tw`opacity-0`,
            props.containerCss,
          ]}
        >
          <div onKeyDown={(e) => e.stopPropagation()}>
            <>
              {doneButton && (
                <div tw="p-8">
                  <div
                    css={[
                      tw`flex justify-between`,
                      props.hideXButton && tw`justify-center`,
                    ]}
                  >
                    <Typography.H2
                      containerCss={[tw`mb-4 mr-4 text-center`, props.titleCss]}
                    >
                      {props.modalTitle}
                    </Typography.H2>
                    {!props.hideXButton && (
                      <HiX
                        css={[tw`h-6 w-6 cursor-pointer `]}
                        onClick={() => props.onClose()}
                      />
                    )}
                  </div>
                  <div css={[props.textCss, tw`mb-10`]}>
                    <Typography.Body containerCss={[tw`text-center`]}>
                      {props.modalText}
                    </Typography.Body>
                    <Typography.Body containerCss={[tw`text-center`]}>
                      {props.modalText2}
                    </Typography.Body>
                  </div>
                  {modalChildrenRadio && (
                    <div css={[tw`p-8 pt-0 `]}>{props.children}</div>
                  )}
                  <div tw="flex justify-center">
                    {!outlinedButton && (
                      <Button.Outlined
                        onClick={() => {
                          props.onClose();
                          if (props.onExitButton) props.onExitButton();
                        }}
                        containerCss={[props.buttonCss]}
                      >
                        {props.secondaryButtonText}
                      </Button.Outlined>
                    )}
                    <Button.Contained
                      onClick={() => props.onProceed?.()}
                      containerCss={[props.containedButtonCss]}
                    >
                      {props.primaryButtonText}
                    </Button.Contained>
                  </div>
                </div>
              )}
              {!modalChildrenRadio && props.modalChildren && (
                <div css={[tw`p-8`]}>{props.children}</div>
              )}
            </>
          </div>
        </div>
      </div>
    </PortalManager>
  );
};
