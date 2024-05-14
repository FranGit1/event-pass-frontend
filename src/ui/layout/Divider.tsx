import { IComponentBaseProps } from "../../types";
import tw from "twin.macro";

export interface IDividerProps extends IComponentBaseProps {
  type?: "horizontal" | "vertical";
}
// STATEMENT: I can't see my divider rendered properly.
// If that happens, there is a big change you don't manage width and height properly
// in the calling context of this component. This components uses w-full(100% width)
// and h-full(100% height) and that unfortunately won't work without it's parent
// height and width being specified
export const Divider = (props: IDividerProps) => {
  const type = props.type ?? "horizontal";

  return (
    <div
      css={[
        tw`m-0 p-0 bg-gray-300`,
        type === "vertical" ? tw`h-0.5 w-full` : tw`h-full w-0.5`,
        props.containerCss,
      ]}
    />
  );
};
