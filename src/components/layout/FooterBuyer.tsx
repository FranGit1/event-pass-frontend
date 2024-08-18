import { useTranslation } from "react-i18next";
import { Button } from "../../ui/buttons/Button";
import { Typography } from "../../ui/Typography";
import { PageContainer } from "./PageContainer";
import tw from "twin.macro";

export const FooterBuyer = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      containerCss={[
        tw`flex flex-col px-10! gap-y-10  md:( flex-row items-start justify-between px-48! mt-40 mb-10 gap-y-0)  `,
      ]}
    >
      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>{t("product")}</Typography.H3>
        <Typography.FooterLinks>{t("allEvents")}</Typography.FooterLinks>
        <Typography.FooterLinks>{t("forOrganizers")}</Typography.FooterLinks>
        <Typography.FooterLinks>{t("requestDemo")}</Typography.FooterLinks>
      </div>

      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>{t("company")}</Typography.H3>
        <Typography.H3 containerCss={[tw`mb-4`]}>
          {t("eventPass")}
        </Typography.H3>
        <Typography.FooterText>{t("addressLine1")}</Typography.FooterText>
        <Typography.FooterText>{t("addressLine2")}</Typography.FooterText>
        <Typography.FooterText>{t("addressLine3")}</Typography.FooterText>
        <Typography.FooterText containerCss={[tw`mb-4`]}>
          {t("oib")}
        </Typography.FooterText>
        <Button.Outlined containerCss={[tw`w-fit`]}>
          {t("contact")}
        </Button.Outlined>
      </div>

      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>
          {t("resources")}
        </Typography.H3>
        <Typography.FooterLinks>{t("helpCenter")}</Typography.FooterLinks>
        <Typography.FooterLinks>
          {t("clientExperiences")}
        </Typography.FooterLinks>
        <Typography.FooterLinks>{t("organizers")}</Typography.FooterLinks>
        <Typography.FooterLinks>{t("blog")}</Typography.FooterLinks>
      </div>
      <div tw="flex flex-col gap-y-2 mb-10 md:(mb-0)">
        <Typography.H3 containerCss={[tw`mb-4`]}>{t("followUs")}</Typography.H3>
        <Typography.FooterLinks>{t("facebook")}</Typography.FooterLinks>
        <Typography.FooterLinks>{t("instagram")}</Typography.FooterLinks>
        <Typography.FooterLinks>{t("linkedin")}</Typography.FooterLinks>
      </div>
    </PageContainer>
  );
};
