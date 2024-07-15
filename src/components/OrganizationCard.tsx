import { useNavigation } from "../hooks/use-navigation";
import { routes } from "../navigation/admin/routing";
import { Organization } from "../types";
import { Button } from "../ui/buttons/Button";
import { Typography } from "../ui/Typography";
import { MdFavoriteBorder } from "react-icons/md";
import tw from "twin.macro";

interface IOrganizationCardProps {
  organization: Organization;
}

export const OrganizationCard = ({ organization }: IOrganizationCardProps) => {
  const { navigate } = useNavigation();
  return (
    <div tw="w-100 rounded-3xl border-1 border-gray-400">
      <div tw="flex flex-row items-center justify-between bg-gray-100 rounded-t-3xl p-4">
        <div tw="flex flex-col">
          <Typography.H2>{organization.title}</Typography.H2>
          <Typography.H3>{organization.organizer}</Typography.H3>
        </div>
        <div>
          <MdFavoriteBorder />
        </div>
      </div>
      <div tw="flex flex-row items-center justify-between p-4">
        <Typography.FooterText>0 live events</Typography.FooterText>
        <Button.Contained
          onClick={() =>
            navigate(`/admin/${routes.eventCreation.base}/${organization.id}`)
          }
        >
          Create event
        </Button.Contained>
      </div>
    </div>
  );
};
