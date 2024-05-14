import { DeleteButton } from '../../../ui/buttons/DeleteButton';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { IComponentBaseProps } from '../../../types';
import tw from 'twin.macro';
import { Typography } from '../../../ui/Typography';

interface IFormFileRowProps extends IComponentBaseProps {
  file: File;
  onFileRemove(): void;
}

export const FormFileRow = (props: IFormFileRowProps) => {
  const { onFileRemove, file } = props;

  return (
    <div css={[tw`flex flex-row mb-2 items-center`, props.containerCss]}>
      <div>
        <HiDocumentDuplicate css={[tw`block h-5 w-5 mr-2 text-primary-100`]} />
      </div>
      <Typography.Body containerCss={[tw`mr-4 flex-1 truncate`]}>{file.name}</Typography.Body>
      <DeleteButton onClick={onFileRemove} containerCss={[tw`ml-6`]}>
        Remove
      </DeleteButton>
    </div>
  );
};
