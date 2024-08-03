import { t } from "i18next";
import { CiHeart, CiSettings } from "react-icons/ci";
import tw from "twin.macro";
import { Typography } from "../../ui/Typography";
import { Button } from "../../ui/buttons/Button";
import { useNavigation } from "../../hooks/use-navigation";
import { ReactComponent as SignOut } from "../../assets/icons/signout.svg";
import { http } from "../../http";
import useAuth from "../../hooks/auth/useAuth";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { useMedia } from "react-use";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { routes } from "../../navigation/admin/routing";

interface MobileMenuProps {
  onNavigation: () => void;
}

export const MobileMenuBuyer = ({ onNavigation }: MobileMenuProps) => {
  const { location, navigate } = useNavigation();
  const isHome = location.pathname === routes.organizations;
  const isMobile = useMedia("(max-width: 1200px)");
  const { auth } = useAuth();

  return (
    <div tw="flex flex-col h-[85vh] w-full justify-between">
      <div css={[isMobile && tw`mt-30`]}>
        {/* <Typography.H3 containerCss={[tw`mb-8 pl-4`]}>{t('myProfile')}</Typography.H3> */}
        {auth.token ? (
          <div>
            {!isHome && (
              <Button.Text
                //@ts-ignore
                lead={Home}
                leadCss={[tw`h-6 w-6`]}
                containerCss={[tw`mb-3 `]}
                onClick={() => navigate(routes.base)}
              >
                {t("home")}
              </Button.Text>
            )}

            <Button.Text
              lead={CiHeart}
              leadCss={[tw`h-6 w-6`]}
              onClick={() => {
                navigate(`/buyer/favorites`);
                onNavigation();
              }}
            >
              {t("favorites")}
            </Button.Text>
          </div>
        ) : (
          <div>
            <Button.Text
              //@ts-ignore
              lead={ProfileIcon}
              leadCss={[tw`h-6 w-6`]}
              containerCss={[tw`mb-4`, isHome && tw`mb-6`]}
              onClick={() => navigate("routes.auth.login")}
            >
              {t("login")}
            </Button.Text>
            {!isHome && (
              <Button.Text
                //@ts-ignore
                lead={Home}
                leadCss={[tw`h-6 w-6`]}
                containerCss={[tw`mb-6 `]}
                onClick={() => {
                  navigate("routes.home.base");
                  onNavigation();
                }}
              >
                {t("allProjects")}
              </Button.Text>
            )}
          </div>
        )}

        <Typography.Body
          containerCss={[tw`text-primary ml-5 mt-4 underline md:hidden block`]}
        >
          Event Pass
        </Typography.Body>
      </div>
      <div tw="self-end flex flex-col items-end mr-12">
        {auth.token && (
          <Button.Text
            onClick={() => {
              http.logout();
              window.location.reload();
            }}
            leadSvg={SignOut}
            leadCss={[tw`h-6 w-6 group-hover:(text-gray)`]}
            containerCss={[tw` `]}
          >
            {t("signOut")}
          </Button.Text>
        )}
        <Typography.FooterText containerCss={[tw`block mt-8 md:hidden`]}>
          {" "}
          {t("")}
        </Typography.FooterText>
        <Typography.FooterText
          containerCss={[tw`block mt-8 md:hidden`]}
          onClick={() => navigate("routes.home.privacy")}
        >
          {t("privacy")}
        </Typography.FooterText>
        <Typography.FooterText
          containerCss={[tw`block mt-8 md:hidden`]}
          onClick={() => navigate("routes.home.terms")}
        >
          {t("terms")}
        </Typography.FooterText>
      </div>
    </div>
  );
};
