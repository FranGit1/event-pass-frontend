import { useFieldArray, useFormContext } from 'react-hook-form';

import { FieldError } from '../../components/FieldError';
import { FieldLabel } from '../../components/FieldLabel';
import { IComponentBaseProps, Images, MarkedArea } from '../../../types';
import { UploadButton } from '../../../ui/buttons/UploadButton';
import { addAsterisk } from '../../../utils';
import tw from 'twin.macro';
import { useFormError } from '../hooks';
import { UploadedFile } from '../../../api-types';
import { UploadButtonLight } from '../../../ui/buttons/UploadButtonLight';
import { UploadImagePreview } from '../../../ui/buttons/UploadImagePreview';
// import { v4 } from 'uuid';

interface IFormFileFieldProps extends IComponentBaseProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  multiple: boolean;
  lightVersion?: boolean;
  disabled?: boolean;
}

export interface IFormFormFileField {
  fileId: string;
  file: File;
}

export const FormFileField = (props: IFormFileFieldProps) => {
  const { control } = useFormContext();
  const { append, remove, ...rest } = useFieldArray({
    control,
    name: props.name
  });
  const error = useFormError(props.name);
  const fields = rest.fields as unknown as IFormFormFileField[];

  const UploadButtonComponent = props.lightVersion ? UploadButtonLight : UploadButton;

  return (
    <div css={[props.containerCss]}>
      {props.lightVersion ? null : (
        <FieldLabel isInErrorState={false} containerCss={[tw`mb-2`]}>
          {addAsterisk(props.label, props.required)}
        </FieldLabel>
      )}

      <FieldError name={props.name} containerCss={[error ? tw`mb-4` : tw`hidden`]} />

      <UploadButtonComponent
        remove={remove}
        uploadedFiles={fields}
        accept={props.accept}
        multiple
        disabled={props.disabled ? props.disabled : false}
        onChange={(files: File[]) => {
          //   [...files].forEach((file) => append({ file, fileId: v4() }));
          try {
            [...files].forEach((file) => append({ file, fileId: '1' }));

            const newFiles: UploadedFile[] = files.map((file) => ({
              name: file.name,
              size: file.size
            }));

            // for (const file of newFiles) {
            //   const uploadData = await requestFileLinks(file);
            //   const fileForUpload = files.find((fileR) => fileR.name === file.fileName);

            //   if (fileForUpload) {
            //     await uploadFile(uploadData.uploadUrl, fileForUpload);
            //   }
            // }
          } catch (e) {
            console.error(e);
            //@ts-ignore
            toast.error(e?.response.data.message);
          }
        }}
      />
    </div>
  );
};
