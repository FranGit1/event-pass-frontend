import "twin.macro";
import { Link, useLocation } from "react-router-dom";

import tw from "twin.macro";
import { IComponentBaseProps } from "../types";
import { Typography } from "../ui/Typography";
import { SidebarItem } from "../utils";

interface ISidebarNavigationProps extends IComponentBaseProps {
  sidebarItems: SidebarItem[];
}

export const SidebarNavigation = ({
  sidebarItems,
}: ISidebarNavigationProps) => {
  const { pathname } = useLocation();
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const selectedRoute =
    sidebarItems.find((i) => new RegExp(`${i.url}/.*`).test(path)) ??
    sidebarItems[0];

  return (
    <div
      css={[
        tw`  md:(mt-18 px-0 w-fit pb-20) w-20 px-6 h-fit`,
        // tw` min-w-full md:sticky md:top-104 px-6 md:px-0 md:min-w-75.75 h-fit`,   --> sticky
        tw`flex flex-col`,
      ]}
    >
      <div
        css={[
          tw`flex-1 md:(p-1 pl-0) p-0 w-68 `, //w-68
          tw`flex flex-col gap-y-2 items-stretch`,
        ]}
      >
        {sidebarItems.map((i, index) => {
          const isSelected = i.url === selectedRoute.url;

          return (
            <Link
              className="group"
              to={i.url}
              key={i.url}
              css={[
                tw`p-2 py-3 mx-2 mx-1 cursor-default bg-transparent text-gray-300 rounded-md`,
                tw`flex flex-row items-center md:justify-center justify-start gap-x-3`,
                tw`md:(justify-start)`,
                tw`hover:(bg-primary-400 text-primary)`,
                isSelected &&
                  tw`bg-primary-100 text-white font-bold hover:(bg-primary-100 text-white)`,
              ]}
            >
              <Typography.Body
                containerCss={[tw`text-inherit  flex gap-x-3 w-full `]}
              >
                {i.icons?.unselected && <i.icons.unselected />}
                <Typography.Body
                  containerCss={[
                    tw`text-gray-400 group-hover:(text-primary)`,
                    isSelected && tw` text-white group-hover:(text-white)`,
                  ]}
                >
                  {i.label}
                </Typography.Body>
              </Typography.Body>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
