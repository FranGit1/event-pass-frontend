import { useFieldArray, useFormContext } from "react-hook-form";
import { FieldLabel } from "../../components/FieldLabel";
import { IComponentBaseProps } from "../../../types";
import { UploadButton } from "../../../ui/buttons/UploadButton";
import { addAsterisk, getMimeType } from "../../../utils";
import tw from "twin.macro";
import { useFormError } from "../hooks";
import { UploadButtonLight } from "../../../ui/buttons/UploadButtonLight";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";

interface IFormFileFieldProps extends IComponentBaseProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  multiple: boolean;
  lightVersion?: boolean;
  disabled?: boolean;
  setTriggerFileUpload?: any;
  setTriggerFileRemoval?: any;
  uploadMessage?: string;
  uploadMessageSub?: string;
  helperText?: string;
  imageUrl?: string;
}

export interface IFormFormFileField {
  fileId: string;
  file: File;
  fileUrl: string;
}

export const FormFileField = (props: IFormFileFieldProps) => {
  const { control } = useFormContext();
  const { append, remove, ...rest } = useFieldArray({
    control,
    name: props.name,
  });
  const error = useFormError(props.name);
  const fields = rest.fields as unknown as IFormFormFileField[];
  const imagesListRef = ref(storage, "images/");

  const UploadButtonComponent = props.lightVersion
    ? UploadButtonLight
    : UploadButton;
  useEffect(() => {
    const downloadImage = async () => {
      if (props.imageUrl) {
        try {
          console.log(props.imageUrl);

          const response = await axios.get(props.imageUrl, {
            responseType: "blob",
          });

          const blob = response.data;

          const urlParts = props.imageUrl.split("?")[0]; // Remove query parameters if any
          const filenameWithUUID = urlParts.substring(
            urlParts.lastIndexOf("/") + 1
          );
          const originalFilename =
            //@ts-ignore
            filenameWithUUID
              .split("%2F")
              .pop()
              .split("-")
              .slice(0, -1)
              .join("-") +
            "." +
            filenameWithUUID.split(".").pop();

          const fileType = getMimeType(originalFilename);

          const file = new File([blob], originalFilename, {
            type: fileType,
          });

          append({ file: file, fileId: "1", fileUrl: props.imageUrl });
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      }
    };
    downloadImage();
  }, [props.imageUrl, append]);
  return (
    <div css={[props.containerCss]}>
      {props.lightVersion ? null : (
        <FieldLabel
          isInErrorState={false}
          containerCss={[tw`mb-2`, error && tw`text-error`]}
        >
          {addAsterisk(props.label, props.required, !!error)}
        </FieldLabel>
      )}

      {/* <FieldError name={props.name} containerCss={[error ? tw`mb-4` : tw`hidden`]} /> */}

      <UploadButtonComponent
        remove={remove}
        uploadedFiles={fields}
        accept={props.accept}
        multiple={props.multiple}
        disabled={props.disabled ? props.disabled : false}
        setTriggerFileUpload={
          props.setTriggerFileUpload ? props.setTriggerFileUpload : null
        }
        control={control}
        setTriggerFileRemoval={props.setTriggerFileRemoval}
        error={error}
        uploadMessage={props.uploadMessage}
        uploadMessageSub={props.uploadMessageSub}
        helperText={props.helperText}
        onChange={async (files: File[]) => {
          // toast.success(t('fileUploadSuccess'));

          try {
            if (props.setTriggerFileUpload) {
              props.setTriggerFileUpload((prev: number) => prev + 1);
            }
            const imageRef = ref(storage, `images/${files[0].name + v4()}`);

            const snapshot = await uploadBytes(imageRef, files[0]);

            const url = await getDownloadURL(snapshot.ref);
            append({ file: files[0], fileId: "1", fileUrl: url });
          } catch (e) {
            console.error(e);
          }
        }}
      />
      {/* <FieldError name={props.name} containerCss={[tw`ml-4 mb-4`]} /> */}
    </div>
  );
};
