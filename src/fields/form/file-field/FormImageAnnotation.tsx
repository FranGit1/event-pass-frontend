import { useFieldArray, useFormContext } from 'react-hook-form';

import { FieldError } from '../../components/FieldError';
import { IComponentBaseProps, Images, MarkedArea } from '../../../types';
import tw from 'twin.macro';
import { useFormError } from '../hooks';
import { UploadedFile } from '../../../api-types';
import { UploadImagePreview } from '../../../ui/buttons/UploadImagePreview';
import { IFormFormFileField } from './FormFileField';
import { Dispatch, SetStateAction } from 'react';
// import { v4 } from 'uuid';

interface IFormImageAnnotationProps extends IComponentBaseProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  multiple: boolean;
  selectedArea?: MarkedArea;
  marksForDisplaying?: MarkedArea[];
  setSelectedArea: Dispatch<SetStateAction<MarkedArea | undefined>>;
  mainImage?: { file: File; fileId: string };
}

export const FormImageAnnotation = (props: IFormImageAnnotationProps) => {
  const { control } = useFormContext();
  const { append, remove, ...rest } = useFieldArray({
    control,
    name: props.name
  });
  const error = useFormError(props.name);
  const fields = rest.fields as unknown as IFormFormFileField[];

  return (
    <div css={[tw`h-full`, props.containerCss]}>
      <FieldError name={props.name} containerCss={[error ? tw`mb-4` : tw`hidden`]} />

      <UploadImagePreview
        remove={remove}
        uploadedFiles={fields}
        accept={props.accept}
        selectedArea={props.selectedArea}
        setSelectedArea={props.setSelectedArea}
        mainImage={props.mainImage}
        marksForDisplaying={props.marksForDisplaying}
        onChange={(files: File[]) => {
          try {
            [...files].forEach((file) => append({ file, fileId: '1' }));

            const newFiles: UploadedFile[] = files.map((file) => ({
              name: file.name,
              size: file.size
            }));
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
