import tw from "twin.macro";
import { useNavigation } from "../../hooks/use-navigation";
import LanguageSelect from "../LanguageSelect";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { Drawer } from "../../ui/layout/Drawer";
import { useBoolean } from "../../hooks/use-boolean";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburger.svg";
import { useMedia } from "react-use";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/auth/useAuth";
import { Button } from "../../ui/buttons/Button";
import { MobileMenu } from "./MobileMenu";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { IComponentBaseProps } from "../../types";
import { useParams } from "react-router-dom";
import { routes } from "../../navigation/admin/routing";

export interface IHeaderProps extends IComponentBaseProps {}

export const Header = (props: IHeaderProps) => {
  const { navigateBuyerHome, navigate, navigateWithSlug, location } =
    useNavigation();
  const { slug } = useParams();
  const [open, { toggle, off }] = useBoolean(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const { auth } = useAuth();

  const isHomePage = location.pathname === `${slug}/${routes.base}`;
  const { t } = useTranslation();

  return (
    <div css={[tw`relative`]}>
      <nav
        css={[
          tw`flex flex-row items-center justify-between px-4 md:px-12 py-4`,
          props.containerCss,
        ]}
      >
        <img
          src={""}
          alt=""
          css={[tw`w-20 h-8 cursor-pointer`]}
          onClick={() => {
            navigate(`/${slug}`);
          }}
        />
        <div tw="flex items-center cursor-pointer relative">
          {isHomePage ? null : (
            <Button.Text
              onClick={() => {
                navigate(`/${slug}`);
              }}
              containerCss={[tw`hidden md:block`, isHomePage && tw`hidden`]}
              leadCss={[tw`text-primary h-6 w-6`]}
              //@ts-ignore
              lead={Home}
            >
              {t("home")}
            </Button.Text>
          )}

          <Button.Text
            onClick={() =>
              auth.token ? toggle() : navigateWithSlug("routes.auth.login")
            }
            containerCss={[tw`hidden md:block`, isHomePage && tw`hidden`]}
            leadCss={[tw`text-primary h-6 w-6`]}
            //@ts-ignore
            lead={ProfileIcon}
          >
            {auth.token ? t("myProfile") : t("login")}
          </Button.Text>

          <LanguageSelect containerCss={[tw`hidden md:block`]} />

          <HamburgerIcon onClick={() => toggle()} tw="block md:hidden" />
          {open && !isMobile && (
            <div
              tw="fixed top-0 left-0 w-[65%] h-full z-50"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              //@ts-ignore
              onClick={toggle}
            ></div>
          )}
          <Drawer
            open={open}
            onClose={off}
            containerCss={[isMobile ? tw`w-[100%]` : tw`w-[35%]`]}
            showLanguageSelect={isMobile ? true : false}
          >
            <MobileMenu onNavigation={off} />
          </Drawer>
        </div>
      </nav>
    </div>
  );
};
