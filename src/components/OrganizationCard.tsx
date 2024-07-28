import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div tw="w-100 rounded-3xl border-1 border-gray-400 ">
      <div
        tw="flex flex-row items-center justify-between bg-gray-100 rounded-t-3xl p-4 cursor-pointer"
        onClick={() =>
          navigate(
            `/admin/${routes.organization.base}/${organization.id}/events`
          )
        }
      >
        <div tw="flex flex-col">
          <div tw="flex items-center gap-x-4">
            <img
              src={
                organization?.organizerLogo ? organization.organizerLogo : ""
              }
              tw="w-12 h-12"
            />
            <div tw="flex flex-col ">
              <Typography.H2>{organization.title}</Typography.H2>
              <Typography.FooterText>
                {organization.legalName}
              </Typography.FooterText>
            </div>
          </div>
          <Typography.H3>{organization.organizer}</Typography.H3>
        </div>
        <div>
          <MdFavoriteBorder tw="h-6 w-6" />
        </div>
      </div>
      <div tw="flex flex-row items-center justify-between p-4">
        <Typography.FooterText>
          {organization.liveEventsCount} {t("liveEvents")}
        </Typography.FooterText>
        <Button.Contained
          onClick={() =>
            navigate(`/admin/${routes.eventCreation.base}/${organization.id}`)
          }
        >
          {t("createEvent")}{" "}
        </Button.Contained>
      </div>
    </div>
  );
};
