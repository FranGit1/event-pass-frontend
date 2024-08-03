import { Button } from "../../ui/buttons/Button";
import { CgProfile } from "react-icons/cg";
import tw from "twin.macro";
import { PageContainer } from "./PageContainer";
import { useNavigation } from "../../hooks/use-navigation";
import useAuth from "../../hooks/auth/useAuth";
import { useTranslation } from "react-i18next";
import { Drawer } from "../../ui/layout/Drawer";
import { useMedia } from "react-use";
import { useBoolean } from "../../hooks/use-boolean";
import { MobileMenuBuyer } from "./MobileMenuBuyer";

export const HeaderBuyer = () => {
  const { navigate } = useNavigation();
  const { auth } = useAuth();
  const { t } = useTranslation();
  const [open, { toggle, off }] = useBoolean(false);
  const isMobile = useMedia("(max-width: 1200px)");
  return (
    <PageContainer containerCss={[tw`px-30!`]}>
      <div tw="w-full flex flex-row justify-between items-center ">
        <img
          tw="h-20 w-20 cursor-pointer"
          onClick={() => navigate("/buyer/home")}
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=sph"
          alt="logo"
        />
        <div tw="flex flex-row  items-center justify-center">
          <Button.Text
            containerCss={[
              tw`uppercase text-primary 
            `,
            ]}
          >
            Kontaktiraj nas
          </Button.Text>
          {auth.token ? (
            <Button.Text
              lead={CgProfile}
              leadCss={[tw`w-6 h-6`]}
              onClick={() => {
                toggle();
              }}
            >
              {t("myProfile")}
            </Button.Text>
          ) : (
            <Button.Outlined
              containerCss={[tw`h-fit ml-8`]}
              onClick={() => navigate("/buyer/login")}
            >
              PRIJAVA
            </Button.Outlined>
          )}
        </div>

        <Drawer
          open={open}
          onClose={off}
          containerCss={[isMobile ? tw`w-[100%]` : tw`w-[35%]`]}
          showLanguageSelect={isMobile ? true : false}
        >
          <MobileMenuBuyer onNavigation={off} />
        </Drawer>
      </div>
    </PageContainer>
  );
};
