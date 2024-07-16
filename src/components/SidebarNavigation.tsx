import "twin.macro";
import { Link, useLocation, matchPath } from "react-router-dom";
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

  // Helper function to determine if a sidebar item's URL matches the current path
  const isRouteSelected = (itemUrl: string, currentPath: string) => {
    console.log(itemUrl, currentPath);

    return matchPath({ path: itemUrl, end: false }, currentPath) !== null;
  };

  // Find the selected route based on the current path
  const selectedRoute =
    sidebarItems.find((i) => isRouteSelected(i.url, pathname)) ??
    sidebarItems[0];

  return (
    <div
      css={[
        tw`md:(mt-18 px-0 w-fit pb-20) w-20 px-6 h-fit bg-gray-600 rounded-xl py-4`,
        tw`flex flex-col`,
      ]}
    >
      <div
        css={[
          tw`flex-1 md:(p-1 pl-0) p-0 w-68`,
          tw`flex flex-col gap-y-2 items-stretch`,
        ]}
      >
        {sidebarItems.map((i, index) => {
          const isSelected = isRouteSelected(i.url, pathname);

          return (
            <Link
              className="group"
              to={i.url}
              key={i.url}
              css={[
                tw`p-2 py-3 mx-2 mx-1 cursor-default bg-transparent text-gray rounded-md`,
                tw`flex flex-row items-center md:justify-center justify-start gap-x-3`,
                tw`md:(justify-start)`,
                tw`hover:(bg-primary-500 text-white)`,
                isSelected &&
                  tw`bg-primary-500 text-white font-bold hover:(bg-primary-300 text-white)`,
              ]}
            >
              <Typography.Body
                containerCss={[tw`text-inherit flex gap-x-3 w-full`]}
              >
                {i.icons?.unselected && <i.icons.unselected />}
                <Typography.Body
                  containerCss={[
                    tw`text-gray-400 group-hover:(text-white)`,
                    isSelected && tw`text-white group-hover:(text-white)`,
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
