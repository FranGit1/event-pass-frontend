import React from 'react';
import { IComponentBaseProps } from '../../types';
import { useLocation, Link, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import { Typography } from '../../ui/Typography';
import { SidebarItem } from '../../utils';

interface ITabNavigationProjectProps extends IComponentBaseProps {
  navItems: SidebarItem[];
}

export const TabNavigationProject = ({ navItems }: ITabNavigationProjectProps) => {
  const { pathname } = useLocation();
  const { projectId } = useParams();
  // const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  let selectedRoute: SidebarItem | undefined;

  if (projectId) {
    selectedRoute = navItems.find((item) => pathname.startsWith(item.url.replace(':projectId', projectId)));
  }

  //   if (id && buildingId && !unitId) {
  //     selectedRoute = navItems.find((item) =>
  //       pathname.match(new RegExp(`^${item.url.replace(':id', id).replace(':buildingId', buildingId)}$`))
  //     );
  //   }

  //   if (id && buildingId && unitId) {
  //     selectedRoute = navItems.find((item) =>
  //       pathname.match(
  //         new RegExp(`^${item.url.replace(':id', id).replace(':buildingId', buildingId).replace(':unitId', unitId)}$`)
  //       )
  //     );
  //   }

  //   if (buildingId && unitId) {
  //     selectedRoute = navItems.find((item) =>
  //       pathname.match(new RegExp(`^${item.url.replace(':buildingId', buildingId).replace(':unitId', unitId)}$`))
  //     );
  //   }

  //   if (offerId) {
  //     selectedRoute = navItems.find((item) => pathname.match(new RegExp(`^${item.url.replace(':offerId', offerId)}$`)));
  //   }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, linkTo: SidebarItem) => {
    // if (!isThisEditingPage()) {
    //   event.preventDefault();
    // }
    // if (isUserEditing) {
    //   event.preventDefault();
    // }
  };

  const getNavLink = (i: SidebarItem) => {
    let finalRoute;

    if (projectId) {
      finalRoute = i.url.replace(':projectId', projectId);
    }

    return finalRoute ? finalRoute : i.url;
  };

  return (
    <div css={[tw`flex `]}>
      <div css={[tw`flex gap-x-12`]}>
        {navItems.map((i) => {
          let isSelected;
          if (selectedRoute) {
            isSelected = i.url === selectedRoute.url;
          }
          return (
            <Link
              className="group"
              to={getNavLink(i)}
              key={i.url}
              css={[
                tw` py-3 cursor-default bg-transparent text-gray relative`,
                tw`flex flex-row items-center md:justify-center justify-start gap-x-3 -mb-0.75 transition ease-in duration-100  `
              ]}
              onClick={(e) => handleClick(e, i)}
            >
              <div
                css={[
                  tw`bottom-11 w-2 h-2 bg-indigo-light rounded-full absolute transition ease-in duration-100 group-hover:(bg-primary)`,
                  isSelected && tw`bg-primary`
                ]}
              />
              <Typography.Body containerCss={[tw`text-inherit  flex gap-x-3 w-full `]}>
                {i.icons?.unselected && <i.icons.unselected />}
                <Typography.Body
                  containerCss={[
                    tw`text-gray-300`, // group-hover:(text-primary)
                    isSelected && tw` text-gray-400`
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
