import tw from "twin.macro";
import { PageContainer } from "../../../../components/layout/PageContainer";
import { Typography } from "../../../../ui/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../../../fields/controlled/TextInput";
import { Button } from "../../../../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../../http";
import { useGetAllOrganizations } from "../../../../queries";
import {
  IComponentBaseProps,
  IOption,
  OrganizationsForSearch,
} from "../../../../types";
import { Select } from "../../../../fields/controlled/Select";
import { IoChevronBack } from "react-icons/io5";
import { useNavigation } from "../../../../hooks/use-navigation";
import { routes } from "../../../../navigation/admin/routing";

export const FetchGenerateCodeOrganizations = () => {
  const { data, isFetched } = useGetAllOrganizations();

  return isFetched && data ? <GenerateCode data={data} /> : <div>Loading</div>;
};

interface IGenerateCodeProps extends IComponentBaseProps {
  data: OrganizationsForSearch[];
}

const GenerateCode = (props: IGenerateCodeProps) => {
  const OrganizationsSelectOptions = props.data.map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const [organizationOption, setOrganizationOption] = useState<IOption<number>>(
    OrganizationsSelectOptions[0]
  );

  const [joinCode, setJoinCode] = useState<string>();
  const { navigate } = useNavigation();

  const { t } = useTranslation();

  const generateCodeMutation = useMutation({
    mutationFn: (organizationId: number) =>
      http.generateOrganizationCode(organizationId),
    onSuccess: (response) => {
      console.log("response data", response);
      setJoinCode(response);
    },
  });

  const handleGenerate = async () => {
    if (organizationOption)
      await generateCodeMutation.mutateAsync(organizationOption.value);
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
          {t("generateOrganizationCode")}
        </Typography.H2>
        <Typography.Body containerCss={[tw`mb-10`]}>
          {t("generateOrganizationInvitationCode")}
        </Typography.Body>

        <Select
          options={OrganizationsSelectOptions}
          placeholder={t("chooseOrganization")}
          value={organizationOption}
          onChange={(value) => {
            if (value) setOrganizationOption(value);
          }}
          containerCss={[tw`max-w-92`]}
          label={t("chooseOrganization")}
        />

        <Button.Contained onClick={handleGenerate} containerCss={[tw`mt-4`]}>
          {t("generateInvitationCode")}
        </Button.Contained>

        {joinCode && (
          <div tw="mt-10">
            <Typography.Body>{t("yourCode")}</Typography.Body>
            <Typography.Body
              containerCss={[
                tw`mt-4 border-1 border-primary rounded-2xl py-2 px-6 w-fit`,
              ]}
            >
              {joinCode}
            </Typography.Body>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
