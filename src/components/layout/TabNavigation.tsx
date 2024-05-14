import React from 'react';
import { IComponentBaseProps } from '../../types';
import { useLocation, Link, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import { Typography } from '../../ui/Typography';
import { SidebarItem } from '../../utils';
import { useTranslation } from 'react-i18next';

interface ITabNavigationProps extends IComponentBaseProps {
  navItems: SidebarItem[];
  isPreview?: boolean;
}

export const TabNavigation = ({ navItems, isPreview }: ITabNavigationProps) => {
  const { pathname } = useLocation();
  const { id, buildingId, unitId, offerId } = useParams();

  const { i18n } = useTranslation();
  const isCroatian = i18n.language === 'hr';

  const getNavLink = (i: SidebarItem) => {
    let finalRoute;

    if (id) {
      finalRoute = i.url.replace(':id', id);
    }
    if (offerId) {
      finalRoute = i.url.replace(':offerId', offerId);
    }

    if (id && buildingId) {
      finalRoute = i.url.replace(':id', id).replace(':buildingId', buildingId);
    }

    if (buildingId && unitId) {
      finalRoute = i.url.replace(':buildingId', buildingId).replace(':unitId', unitId);
    }

    if (id && buildingId && unitId) {
      finalRoute = i.url.replace(':id', id).replace(':buildingId', buildingId).replace(':unitId', unitId);
    }

    return finalRoute ? finalRoute : i.url;
  };

  const firstSlashIndex = pathname.indexOf('/');
  const secondSlashIndex = pathname.indexOf('/', firstSlashIndex + 1);
  const thirdSlashIndex = pathname.indexOf('/', secondSlashIndex + 1);
  const formattedPathname = location.pathname.substring(thirdSlashIndex + 1);
  const selectedNavItemIndex = navItems.findIndex((ni) => formattedPathname === getNavLink(ni));
  const navItemsLength = navItems.length;
  let widthConstant = isPreview ? 1.45 : selectedNavItemIndex === 3 ? 1.18 : 1.1;

  const backgroundColorWidth =
    selectedNavItemIndex === navItemsLength - 1
      ? '100%'
      : (selectedNavItemIndex / navItemsLength) * 100 * widthConstant + '%';
  const transitionWidth = '0.01px';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, linkTo: SidebarItem) => {
    const targetIndex = navItems.findIndex((item) => item === linkTo);

    if (targetIndex >= selectedNavItemIndex) {
      event.preventDefault();
    }
  };

  return (
    <div css={[tw`flex `]}>
      <div css={[tw`flex gap-x-12 relative`]}>
        <div
          css={[
            tw`h-2 absolute bottom-10.5 left-4 rounded-full w-[89%]`,
            isPreview && tw` w-[80%]`,
            isPreview && isCroatian && tw` w-[79%]`,
            isCroatian && tw`left-8`
          ]}
          style={{
            backgroundImage: `linear-gradient(to right, #dfe7ff ${backgroundColorWidth}, transparent ${backgroundColorWidth}, transparent calc(${backgroundColorWidth} + ${transitionWidth}), #eeeeee calc(${backgroundColorWidth} + ${transitionWidth}), #eeeeee 100%)`
          }}
        />
        {/* <div css={[tw`bg-primary h-2  absolute bottom-10.5 left-7 rounded-full w-[42%] opacity-30`]} /> */}

        {navItems.map((item, index) => {
          const isSelected = pathname === getNavLink(item);

          return (
            <Link
              className="group"
              to={getNavLink(item)}
              key={item.url}
              css={[
                tw` py-3 cursor-default bg-transparent text-gray relative`,
                tw`flex flex-row items-center md:justify-center justify-start gap-x-3 -mb-0.75 transition ease-in duration-100  `
              ]}
              onClick={(e) => handleClick(e, item)}
            >
              <div
                css={[
                  tw`bottom-11 w-2 h-2 bg-indigo-secondary rounded-full absolute transition ease-in duration-100`,
                  selectedNavItemIndex >= index && tw`bg-primary cursor-pointer`
                ]}
              />
              <Typography.Body containerCss={[tw`text-inherit  flex gap-x-3 w-full`]}>
                {item.icons?.unselected && <item.icons.unselected />}
                <Typography.Body containerCss={[tw`text-gray-300`, isSelected && tw` text-gray-400`]}>
                  {item.label}
                </Typography.Body>
              </Typography.Body>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
