import tw from "twin.macro";
import { PageContainer } from "../../../components/layout/PageContainer";
import { OrganizationCard } from "../../../components/OrganizationCard";
import { useNavigation } from "../../../hooks/use-navigation";
import { routes } from "../../../navigation/admin/routing";
import { useGetComplexBuildingsAndUnitTypes } from "../../../queries";
import { Organization } from "../../../types";
import { Button } from "../../../ui/buttons/Button";
import { Typography } from "../../../ui/Typography";
import { CenterContainer } from "../../../components/layout/CenterContainer";

export const AdminHome = () => {
  const { navigate } = useNavigation();
  const { data } = useGetComplexBuildingsAndUnitTypes(1);
  console.log(data);

  return (
    <PageContainer containerCss={[tw`px-20`]}>
      <Typography.H1 containerCss={[tw`mb-20 w-fit`]}>
        Your organizations
      </Typography.H1>
      <div tw="flex flex-col items-center justify-center">
        <div>
          {data?.map((organization: Organization) => {
            return <OrganizationCard organization={organization} />;
          })}
        </div>
      </div>
    </PageContainer>
  );
};
