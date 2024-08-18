import tw from "twin.macro";
import { PageContainer } from "../../../../components/layout/PageContainer";
import { Typography } from "../../../../ui/Typography";
import { useState } from "react";
import { TextInput } from "../../../../fields/controlled/TextInput";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../http";
import { toast } from "../../../../ui/indicators/Toast";
import { useNavigation } from "../../../../hooks/use-navigation";
import { routes } from "../../../../navigation/admin/routing";
import { IoChevronBack } from "react-icons/io5";

export const JoinOrganization = () => {
  const [organizationCode, setOrganizationCode] = useState<string>("");
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const joinOrganizationMutation = useMutation({
    mutationFn: (organizationCode: string) =>
      http.joinOrganizationViaCode(organizationCode),
    onSuccess: () => {
      toast.success(t("successJoin"));
      navigate(routes.base);
    },
  });

  const handleJoin = async () => {
    await joinOrganizationMutation.mutateAsync(organizationCode);
  };

  return (
    <PageContainer containerCss={[tw`ml-20 mt-14 pl-0!`]}>
      <div>
        <Button.Text
          containerCss={[
            tw` self-start mt-10 pb-12 hidden min-w-0 pl-0 md:flex`,
          ]}
          lead={IoChevronBack}
          onClick={() => {
            navigate(routes.base);
          }}
        >
          {t("back")}
        </Button.Text>
        <Typography.H2 containerCss={[tw`mb-4`]}>
          {t("joinOrganizationText")}
        </Typography.H2>
        <Typography.Body containerCss={[tw`mb-10`]}>
          {t("joinOrganizationWithCode")}
        </Typography.Body>

        <TextInput.Contained
          containerCss={[tw`w-[40%] mb-4`]}
          label={t("invitationCode")}
          value={organizationCode}
          onChange={(value) => setOrganizationCode(value)}
        ></TextInput.Contained>

        <Button.Contained onClick={handleJoin}>{t("join")}</Button.Contained>
      </div>
    </PageContainer>
  );
};
