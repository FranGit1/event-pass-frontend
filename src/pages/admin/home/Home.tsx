import tw from "twin.macro";
import { PageContainer } from "../../../components/layout/PageContainer";
import { OrganizationCard } from "../../../components/OrganizationCard";
import { useNavigation } from "../../../hooks/use-navigation";
import { useGetComplexBuildingsAndUnitTypes } from "../../../queries";
import { Organization } from "../../../types";
import { Button } from "../../../ui/buttons/Button";
import { Typography } from "../../../ui/Typography";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { routes } from "../../../navigation/admin/routing";

export const AdminHome = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { data } = useGetComplexBuildingsAndUnitTypes();
  console.log(data);

  return (
    <PageContainer containerCss={[tw`px-20`]}>
      <Typography.H1 containerCss={[tw`mb-20 mt-8 w-fit`]}>
        {t("yourOrganizations")}
      </Typography.H1>
      <div tw="flex flex-col items-center justify-center">
        <div
          tw="p-10 w-100 rounded-3xl border-2  border-primary mb-10 bg-primary cursor-pointer"
          onClick={() =>
            navigate(
              `/admin/${routes.organization.base}/${routes.organization.generateJoinCode}`
            )
          }
        >
          <Button.Text textCss={[tw`text-white`]}>
            {t("generateCode")}
          </Button.Text>
        </div>
        <div
          tw="p-10 w-100 rounded-3xl border-2 border-dashed border-primary mb-10"
          onClick={() =>
            navigate(
              `/admin/${routes.organization.base}/${routes.organization.joinOrganization}`
            )
          }
        >
          <Button.Text lead={FaPlus}>{t("joinOrganization")}</Button.Text>
        </div>
        <div>
          {data?.map((organization: Organization) => {
            return (
              <OrganizationCard
                organization={organization}
                key={organization.id}
              />
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};
