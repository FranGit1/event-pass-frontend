import 'twin.macro';
import { PropsWithChildren, useRef, useState } from 'react';
import React from 'react';
import tw from 'twin.macro';
import { useAsync } from 'react-use';
import { HiX } from 'react-icons/hi';
import { Maybe } from 'yup';
import { PortalManager } from '../../../components/PortalManager';
import { IComponentBaseProps, TwinStyle } from '../../../types';
import { Typography } from '../../../ui/Typography';
import { Button } from '../../../ui/buttons/Button';
import { onKeyDownA11Y } from '../../../utils';
import { waitUntilAnimationFinish } from '../../../utils/wailt-until-animation-finish';
import { TextInput } from '../../../fields/controlled/TextInput';

export interface IModalProps extends IComponentBaseProps {
  open: boolean;
  onClose: () => void;
  onProceed?: () => void;
  onExitButton?: () => void;
  doneButton?: boolean;
  outlinedButton?: boolean;
  outlinedButtonText?: string;
  containedButtonText?: string;
  buttonCss?: Maybe<TwinStyle>;
  titleCss?: Maybe<TwinStyle>;
  containedButtonCss?: Maybe<TwinStyle>;
  modalTitle?: string;
  modalText?: string;
  modalChildren?: boolean;
  modalChildrenRadio?: boolean;
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const Modal = ({
  doneButton = false,
  outlinedButton = true,
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
      document.body.style.overflow = 'hidden';

      setSoftOpen(true);
      setTimeout(() => {
        setHardOpen(true);
        const element = contentRef.current as any;
        element.focus();
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
      setHardOpen(false);
      await waitUntilAnimationFinish(parentRef.current);
      setSoftOpen(false);
    }
  }, [props.open]);

  const onClose = async () => {
    document.body.style.overflow = 'unset';
    setHardOpen(false);
    await waitUntilAnimationFinish(parentRef.current);
    setSoftOpen(false);
    props.onClose();
  };
  if (!softOpen) {
    return null;
  }
  return (
    <PortalManager>
      <div
        aria-hidden={false}
        onClick={onClose}
        // @ts-ignore
        ref={parentRef}
        css={[
          tw`flex justify-center items-center`,
          tw`fixed left-0 right-0 top-0 bottom-0 `,
          tw`transition-colors duration-300`,
          hardOpen ? tw`bg-black` : tw`bg-transparent`
        ]}
      >
        <div
          tabIndex={0}
          role="dialog"
          onKeyDown={onKeyDownA11Y({ close: onClose })}
          onClick={(e) => e.stopPropagation()}
          // @ts-ignore
          ref={contentRef}
          css={[
            tw`md:m-6 shadow md:rounded-xl relative`,
            tw`bg-white`,
            tw`transition-opacity duration-300`,
            tw`flex justify-center items-center`,
            tw`focus-visible:outline-0`,
            // tw`w-full 2xs:max-w-xs xs:max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl`,
            // tw`md:w-fit md:h-fit w-full h-[calc(100vh)] p-10`,
            hardOpen ? tw`opacity-100` : tw`opacity-0`,
            props.containerCss
          ]}
        >
          <div onKeyDown={(e) => e.stopPropagation()}>
            <>
              {doneButton && (
                <div tw="p-8">
                  <div tw="flex justify-between">
                    <Typography.H2 containerCss={[tw`mb-4 mr-4`, props.titleCss]}>{props.modalTitle}</Typography.H2>
                    {/* <HiX css={[tw`h-6 w-6 cursor-pointer `]} onClick={() => props.onClose()} /> */}
                  </div>
                  <Typography.Caption containerCss={[tw`mb-12`]}>{props.modalText}</Typography.Caption>

                  <TextInput.Contained
                    value={props.term}
                    onChange={(value) => {
                      props.setTerm(value ?? '');
                    }}
                    containerCss={[tw`w-full mb-12`]}
                    placeholder={'RAL npr. 210 50 45'}
                  />
                  {modalChildrenRadio && <div css={[tw`p-8 pt-0 `]}>{props.children}</div>}
                  <div tw="flex w-full ">
                    {outlinedButton && (
                      <Button.Outlined
                        onClick={() => {
                          props.onClose();
                          if (props.onExitButton) props.onExitButton();
                        }}
                        containerCss={[props.buttonCss]}
                      >
                        {props.outlinedButtonText}
                      </Button.Outlined>
                    )}
                    <Button.Contained
                      onClick={() => props.onProceed?.()}
                      containerCss={[tw`w-full`, props.containedButtonCss]}
                    >
                      {props.containedButtonText}
                    </Button.Contained>
                  </div>
                </div>
              )}
              {!modalChildrenRadio && props.modalChildren && <div css={[tw`p-8`]}>{props.children}</div>}
            </>
          </div>
        </div>
      </div>
    </PortalManager>
  );
};
