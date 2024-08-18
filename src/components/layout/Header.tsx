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
import { routes } from "../../navigation/admin/routing";

export interface IHeaderProps extends IComponentBaseProps {}

export const Header = (props: IHeaderProps) => {
  const { navigate } = useNavigation();
  const [open, { toggle, off }] = useBoolean(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const { auth } = useAuth();

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
          tw="h-20 w-20 cursor-pointer"
          onClick={() => navigate(`/`)}
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=sph"
          alt="logo"
        />

        <div tw="flex items-center cursor-pointer relative">
          <Button.Text
            onClick={() => {
              navigate(`/`);
            }}
            containerCss={[tw`hidden md:block`]}
            leadCss={[tw`text-primary h-6 w-6`]}
            //@ts-ignore
            lead={Home}
          >
            {t("home")}
          </Button.Text>

          <Button.Text
            onClick={() =>
              auth.token ? toggle() : navigate(routes.auth.login)
            }
            containerCss={[tw`hidden md:block`]}
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
