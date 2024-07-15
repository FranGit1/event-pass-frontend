import tw from "twin.macro";

import { useTranslation } from "react-i18next";
import { useMedia } from "react-use";
import LanguageSelect from "../../../components/LanguageSelect";
import { Footer } from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";
import { PageContainer } from "../../../components/layout/PageContainer";
import { routes } from "../../../navigation/admin/routing";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { Card } from "../../../ui/layout/Card";
import { Tabs } from "../../../ui/layout/Tabs";
import { LoginPage } from "./Login";
import { RegisterPage } from "./RegisterPage";
import { useNavigation } from "../../../hooks/use-navigation";
import { IoChevronBack } from "react-icons/io5";

export const AuthTabsPage = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const isMobile = useMedia("(max-width: 1200px)");

  return (
    <PageContainer containerCss={[tw` h-[calc(100vh-6rem)]`]}>
      <div tw="hidden mt-6 md:(flex justify-end)">
        <LanguageSelect />
      </div>
      <Button.Text
        containerCss={[tw` self-start mt-10 hidden md:flex`]}
        lead={IoChevronBack}
        onClick={() => {
          navigate(routes.base);
        }}
      >
        {t("back")}
      </Button.Text>
      <div tw="flex flex-col justify-between items-center h-full mb-0 mt-10 md:mt-[-2.5rem]">
        <div tw="flex-col items-center text-center ">
          {isMobile ? (
            <Typography.H2 containerCss={[tw`mb-4 md:mb-0`]}>
              {" "}
              {t("loginMessage")}
            </Typography.H2>
          ) : (
            <Typography.H1 containerCss={[tw`mb-4 md:mb-0`]}>
              {" "}
              {t("loginMessage")}
            </Typography.H1>
          )}

          <Card.Elevated
            hideShadow={isMobile && true}
            containerCss={[tw`px-4 md:px-7 rounded-xl`]}
          >
            <Tabs showTabOnTop={true} showTabsCenter={true}>
              <Tabs.Item text={t("login")} tabFullWidth={true}>
                <LoginPage />
              </Tabs.Item>
              <Tabs.Item text={t("signUp")} tabFullWidth={true}>
                <RegisterPage />
              </Tabs.Item>
            </Tabs>
          </Card.Elevated>
        </div>

        {!isMobile && (
          <Footer authScreenFooter={true} containerCss={[tw`w-full px-0`]} />
        )}
      </div>
    </PageContainer>
  );
};
