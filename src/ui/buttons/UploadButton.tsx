import "twin.macro";

import { IComponentBaseProps, Maybe } from "../../types";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { TfiUpload } from "react-icons/tfi";

import { Button } from "./Button";
import { Typography } from "../Typography";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";
import { IFormFormFileField } from "../../fields/form/file-field/FormFileField";
import { toast } from "../indicators/Toast";
import { FromFileUploadCard } from "../../fields/form/file-field/FromFileUploadCard";

interface IUploadButtonProps extends IComponentBaseProps {
  accept?: Maybe<string>;
  multiple?: boolean;
  onChange(files: File[]): void;
  disabled?: boolean;
  remove(index?: number): void;
  uploadedFiles?: IFormFormFileField[];
  setTriggerFileRemoval?: any;
  setTriggerFileUpload?: any;
  error: string | null;
  uploadMessage?: string;
  uploadMessageSub?: string;
  helperText?: string;
}

export const UploadButton = (props: PropsWithChildren<IUploadButtonProps>) => {
  const ref = useRef<any>();
  const { t } = useTranslation();
  const [sizeErrorModalSingle, setSizeErrorModalSingle] = useState(false);
  const [sizeErrorModalMultiple, setSizeErrorModalMultiple] = useState(false);
  const validMimeTypes = ["image/jpeg", "image/png"];
  const MAX_FILE_SIZE_MB = 1 * 1024 * 1024;

  const filterValidFiles = (files: File[]) => {
    return files.filter(
      (file) =>
        validMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE_MB
    );
  };
  const filterInvalidFiles = (files: File[]) => {
    return files.filter(
      (file) =>
        !validMimeTypes.includes(file.type) && file.size >= MAX_FILE_SIZE_MB
    );
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSizeErrorModalMultiple(false);
    setSizeErrorModalSingle(false);
    const files = Array.from(event.dataTransfer.files);
    const largeFiles = filterInvalidFiles(files);

    if (largeFiles.length > 0) {
      const largeFileNames = largeFiles.map((file) => file.name).join("\n");

      if (largeFiles.length === 1) {
        toast.error(`${t("sizeErrorModalSingle")} ${largeFileNames}`);
        setSizeErrorModalSingle(true);
      } else {
        toast.error(`${t("sizeErrorModalMultiple")} ${largeFileNames}`);
        setSizeErrorModalMultiple(true);
      }
    }

    const validFiles = filterValidFiles(files);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const largeFiles = filterInvalidFiles(files);
    setSizeErrorModalMultiple(false);
    setSizeErrorModalSingle(false);
    if (largeFiles.length > 0) {
      const largeFileNames = largeFiles.map((file) => file.name).join("\n");
      if (largeFiles.length === 1) {
        toast.error(`${t("sizeErrorModalSingle")} ${largeFileNames}`);
        setSizeErrorModalSingle(true);
      } else {
        toast.error(`${t("sizeErrorModalMultiple")} ${largeFileNames}`);
        setSizeErrorModalMultiple(true);
      }
    }

    const validFiles = filterValidFiles(files);
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
  useEffect(() => {}, [props.error]);

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
      <div
        css={[
          tw`flex flex-row justify-between w-fit gap-x-12 border-2 border-dashed border-primary rounded-2xl p-6`,
          props.error && tw`border-error`,
        ]}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div tw="flex flex-col items-start">
          <Button.Text
            lead={TfiUpload}
            onClick={() => ref?.current?.click()}
            textCss={[tw`font-normal`]}
          >
            {t("dragFiles")}
          </Button.Text>
          <Typography.FooterText containerCss={[tw`ml-4 `]}>
            {props.uploadMessage}
          </Typography.FooterText>
          <Typography.FooterText containerCss={[tw`ml-4 `]}>
            {props.uploadMessageSub}
          </Typography.FooterText>
          <div css={[tw`flex flex-row flex-wrap p-4`]}>
            {props.uploadedFiles
              ? props.uploadedFiles.map((field, index) => {
                  return (
                    field.file && (
                      <FromFileUploadCard
                        key={field.file.lastModified}
                        onFileRemove={() => {
                          props.remove(index);
                          if (props.setTriggerFileRemoval) {
                            props.setTriggerFileRemoval(
                              (prev: number) => prev + 1
                            );
                          }
                        }}
                        containerCss={[tw`mb-3`]}
                        file={field.file}
                      />
                    )
                  );
                })
              : null}
          </div>
        </div>
        <Button.Contained
          containerCss={[tw`h-fit self-center`]}
          disabled={props.disabled}
          onClick={() => {
            ref?.current?.click();
          }}
        >
          {t("browse")}
        </Button.Contained>
      </div>

      {sizeErrorModalSingle && (
        <Typography.FooterText containerCss={[tw`mt-2 text-error`]}>
          {t("fileUploadErrorHelperTextSingle")}
        </Typography.FooterText>
      )}
      {sizeErrorModalMultiple && (
        <Typography.FooterText containerCss={[tw`mt-2 text-error`]}>
          {t("fileUploadErrorHelperTextMultiple")}
        </Typography.FooterText>
      )}

      {props.error?.includes("mediaData.thumbnail") ? (
        <Typography.FooterText containerCss={[tw`mt-4 text-error`]}>
          {t("requiredField")}
        </Typography.FooterText>
      ) : props.error?.includes("mediaData.projectImages") ? (
        <Typography.FooterText containerCss={[tw`mt-4 text-error`]}>
          {t("requiredField")}
        </Typography.FooterText>
      ) : (
        !(sizeErrorModalSingle || sizeErrorModalMultiple) && (
          <Typography.Notice containerCss={[tw`mt-2`]}>
            {props.helperText}
          </Typography.Notice>
        )
      )}
    </>
  );
};
