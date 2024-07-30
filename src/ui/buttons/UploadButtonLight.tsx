import "twin.macro";

import { IComponentBaseProps, Maybe } from "../../types";
import React, { PropsWithChildren, useRef } from "react";
import { Button } from "./Button";
import { Typography } from "../Typography";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";
import { IFormFormFileField } from "../../fields/form/file-field/FormFileField";
import { ReactComponent as Attach } from "../../assets/icons/attach_file_add.svg";
import { RxCross2 } from "react-icons/rx";
import { ReactComponent as Download } from "../../assets/icons/downloading.svg";
import { Control, FieldValues } from "react-hook-form";
import { toast } from "../indicators/Toast";

interface IUploadButtonLightProps extends IComponentBaseProps {
  accept?: Maybe<string>;
  multiple?: boolean;
  onChange(files: File[]): void;
  disabled?: boolean;
  remove(index?: number): void;
  uploadedFiles?: IFormFormFileField[];
  setTriggerFileUpload?: any;
  setTriggerFileRemoval?: any;
  control: Control<FieldValues, any>;
  error: string | null;
  uploadMessage?: string;
  uploadMessageSub?: string;
  helperText?: string;
}

export const UploadButtonLight = (
  props: PropsWithChildren<IUploadButtonLightProps>
) => {
  const ref = useRef<any>();
  const { t } = useTranslation();

  const MAX_FILE_SIZE_MB = 1 * 1024 * 1024;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const largeFiles = files.filter((file) => file.size > MAX_FILE_SIZE_MB);

    if (largeFiles.length > 0) {
      const largeFileNames = largeFiles.map((file) => file.name).join("\n");
      if (largeFiles.length === 1) {
        toast.error(`${t("sizeErrorModalSingle")} ${largeFileNames}`);
      } else {
        toast.error(`${t("sizeErrorModalMultiple")} ${largeFileNames}`);
      }
    }

    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE_MB);

    if (validFiles.length > 0) {
      if (props.setTriggerFileUpload) {
        props.setTriggerFileUpload((prev: number) => prev + 1);
      }
      props.onChange(validFiles);

      if (validFiles.length === files.length) {
        if (validFiles.length === 1) {
          toast.success(t("fileUploadSuccessSingle"));
        } else {
          toast.success(t("fileUploadSuccessMultiple"));
        }
      }
    }
  };

  return (
    <>
      <input
        type="file"
        accept={props.accept ?? "image/jpeg, image/png"}
        multiple={props.multiple ?? false}
        ref={ref}
        tw="hidden"
        onClick={(event: any) => (event.target.value = null)}
        onChange={handleChange}
      />
      <div tw="">
        <Button.Text
          leadSvg={Attach}
          containerCss={[tw`h-fit self-center`]}
          textCss={[tw`font-normal`]}
          leadCss={[tw`w-6 h-6`]}
          disabled={props.disabled}
          onClick={() => {
            ref?.current?.click();
          }}
        >
          {t("addFiles")}
        </Button.Text>
        {props.uploadedFiles && props.uploadedFiles.length > 0 && (
          <div css={[tw`flex flex-row flex-wrap `]}>
            {props.uploadedFiles.map((field, index) => {
              return (
                <div
                  tw="flex flex-row items-center gap-x-4 bg-gray-600 rounded-lg w-fit p-1 m-2"
                  key={field.file.lastModified}
                >
                  {!props.disabled && (
                    <RxCross2
                      tw="text-gray cursor-pointer w-5 h-5"
                      onClick={() => {
                        props.remove(index);
                        props.setTriggerFileUpload((prev: number) => prev + 1);
                      }}
                    />
                  )}
                  <Typography.Body containerCss={[tw`text-sm`]}>
                    {field.file?.name}
                  </Typography.Body>
                  <Download />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
