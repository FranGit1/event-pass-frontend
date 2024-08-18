import tw from "twin.macro";
import { Typography } from "../../ui/Typography";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IComponentBaseProps } from "../../types";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/buttons/Button";
import { useNavigation } from "../../hooks/use-navigation";

export interface IFooterProps extends IComponentBaseProps {
  authScreenFooter?: boolean;
}

export const Footer = (props: IFooterProps) => {
  const { t } = useTranslation();
  const { navigateWithSlug, navigate } = useNavigation();
  return (
    <footer
      css={[
        tw`px-12 py-8 flex flex-col md:(flex-row justify-between flex-wrap) mt-8 gap-x-14 gap-y-12`,
        props.containerCss,
      ]}
    >
      <Typography.FooterText containerCss={[tw`cursor-default`]}>
        {" "}
        {t("")}
      </Typography.FooterText>
      <Typography.FooterText
        containerCss={[tw`cursor-pointer`]}
        onClick={() => navigate("routes.home.privacy")}
      >
        {" "}
        {t("privacy")}
      </Typography.FooterText>
      <Typography.FooterText
        containerCss={[tw`cursor-pointer`]}
        onClick={() => navigate("routes.home.terms")}
      >
        {" "}
        {t("terms")}
      </Typography.FooterText>

      <div tw="flex flex-col md:flex-row items-center gap-x-4">
        {props.authScreenFooter ? (
          <Typography.FooterText containerCss={[tw`cursor-pointer`]}>
            {" "}
            {t("contactSupport")}
          </Typography.FooterText>
        ) : (
          <div tw="flex flex-row gap-x-14 items-center p-0">
            <Button.Text
              lead={MdOutlineLocalPhone}
              leadCss={[tw`h-6 w-6`]}
              containerCss={[tw`p-0`]}
            >
              <a href={`tel:+385 91 925 8421`}>+385 91 544521</a>
            </Button.Text>

            <Typography.Body
              containerCss={[tw`text-primary cursor-pointer`]}
              onClick={() => navigateWithSlug("routes.home.contact")}
            >
              {" "}
              {t("contact")}
            </Typography.Body>
            <Typography.FooterText>Event Pass d.o.o</Typography.FooterText>
          </div>
        )}
      </div>
      {props.authScreenFooter && (
        <Typography.FooterText> Event Pass d.o.o</Typography.FooterText>
      )}
    </footer>
  );
};
