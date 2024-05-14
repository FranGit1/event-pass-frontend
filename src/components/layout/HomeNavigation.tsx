import 'twin.macro';
import { Link, useLocation } from 'react-router-dom';
import { IComponentBaseProps } from '../../types';
import { Typography } from '../../ui/Typography';
import tw from 'twin.macro';
import { SidebarItem } from '../../utils';

interface ISidebarNavigationProps extends IComponentBaseProps {
  sidebarItems: SidebarItem[];
}

export const HomeNavigation = ({ sidebarItems }: ISidebarNavigationProps) => {
  const { pathname } = useLocation();
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const selectedRoute = sidebarItems.find((i) => new RegExp(`${i.url}/.*`).test(path)) ?? sidebarItems[0];

  return (
    <div
      css={[
        // Sidebar is set to sticky. Now, when you scroll sidebar will always stay on top.
        // tw` min-w-full md:sticky md:top-104 px-6 md:px-0 md:min-w-75.75 h-fit`,   --> sticky
        tw`flex flex-row`
      ]}
    >
      <div css={[tw`flex flex-row justify-between w-full`]}>
        {sidebarItems.map((i) => {
          const isSelected = i.url === selectedRoute.url;

          return (
            <Link
              className="group"
              to={i.url}
              key={i.url}
              css={[tw`cursor-pointer text-primary-300 rounded-md `, isSelected && tw``]}
            >
              <Typography.Body containerCss={[tw`  `]}>
                {i.icons?.unselected && <i.icons.unselected />}
                <Typography.Body
                  containerCss={[
                    tw`text-primary-300 group-hover:(text-primary-500 border-b-4 border-primary-100)`,
                    isSelected &&
                      tw`text-primary border-b-4 border-primary bg-transparent transition-all duration-500 group-hover:(border-b-6 border-primary text-primary)`
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
