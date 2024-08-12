import { Button } from "../../ui/buttons/Button";
import { Typography } from "../../ui/Typography";
import { PageContainer } from "./PageContainer";
import tw from "twin.macro";

export const FooterBuyer = () => {
  return (
    <PageContainer
      containerCss={[
        tw`px-48! flex flex-row items-start justify-between mt-40 mb-10`,
      ]}
    >
      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>Proizvod</Typography.H3>
        <Typography.FooterLinks>Svi događaji</Typography.FooterLinks>
        <Typography.FooterLinks>Za organizatore</Typography.FooterLinks>
        <Typography.FooterLinks>Zatraži demo</Typography.FooterLinks>
      </div>

      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>Tvrtka</Typography.H3>
        <Typography.H3 containerCss={[tw`mb-4`]}>
          Event Pass d.o.o.
        </Typography.H3>
        <Typography.FooterText>Maksimirksa 24,</Typography.FooterText>
        <Typography.FooterText>10000 Zagreb,</Typography.FooterText>
        <Typography.FooterText>Hrvatska,</Typography.FooterText>
        <Typography.FooterText containerCss={[tw`mb-4`]}>
          OIB: 515434335
        </Typography.FooterText>
        <Button.Outlined>KONTAKT</Button.Outlined>
      </div>

      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>Resursi</Typography.H3>
        <Typography.FooterLinks>Centar za pomoć</Typography.FooterLinks>
        <Typography.FooterLinks>Iskustva klijenata</Typography.FooterLinks>
        <Typography.FooterLinks>Organizatori</Typography.FooterLinks>
        <Typography.FooterLinks>Blog</Typography.FooterLinks>
      </div>
      <div tw="flex flex-col gap-y-2">
        <Typography.H3 containerCss={[tw`mb-4`]}>
          Prati nas i prvi saznaj!
        </Typography.H3>
        <Typography.FooterLinks>Facebook</Typography.FooterLinks>
        <Typography.FooterLinks>Instagram</Typography.FooterLinks>
        <Typography.FooterLinks>LinkedIn</Typography.FooterLinks>
      </div>
    </PageContainer>
  );
};
