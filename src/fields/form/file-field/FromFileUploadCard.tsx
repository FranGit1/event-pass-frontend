import { IComponentBaseProps } from "../../../types";
import tw from "twin.macro";
import { Typography } from "../../../ui/Typography";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

interface IFromFileUploadCardProps extends IComponentBaseProps {
  file: File;
  onFileRemove(): void;
}

export const FromFileUploadCard = (props: IFromFileUploadCardProps) => {
  const { onFileRemove, file } = props;
  const sizeInKB = Math.ceil(file.size / 1024);
  const formattedSize = sizeInKB.toString().padStart(3, "0");
  const truncatedFileName =
    file.name.length > 15 ? file.name.substring(0, 8) + "..." : file.name;

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div
      css={[
        tw`flex flex-col mb-2 items-start bg-gray-600 px-4 py-2 rounded-lg w-[20rem] m-4`,
        props.containerCss,
      ]}
    >
      <div tw="flex flex-row items-center pb-2">
        <RxCross2 onClick={onFileRemove} tw="w-6 h-6 cursor-pointer mr-2" />
        <Typography.Body containerCss={[tw`flex-1 truncate mr-2 `]}>
          {truncatedFileName}
        </Typography.Body>
        <Typography.Body containerCss={[tw`mr-2`]}>
          {formattedSize} kB
        </Typography.Body>
        {/* <Download /> */}
      </div>
      <div
        tw="w-[8.875rem] h-[7.94775rem] bg-gray-700"
        css={{
          backgroundImage: `url(${imagePreviewUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};
