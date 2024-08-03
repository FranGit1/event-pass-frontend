import { useParams } from "react-router-dom";
import { PageContainer } from "../../../components/layout/PageContainer";
import { Typography } from "../../../ui/Typography";
import { useGetOrganizationEvents } from "../../../queries";
import { EventResDto, Organization } from "../../../types";
import { MdLink } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import tw from "twin.macro";
import { Button } from "../../../ui/buttons/Button";
import EventGrid from "../../../components/layout/EventGrid";
import { splitEventsByEndDate } from "../../../utils";
import { useTranslation } from "react-i18next";

export const OrganizationDetailsComponent = () => {
  const { organizationId } = useParams();
  const { t } = useTranslation();
  const { data, isFetched } = useGetOrganizationEvents(Number(organizationId));
  const organization: Organization | undefined = data?.organization;
  const events: EventResDto[] = data ? data.events : [];
  const { ongoingEvents, pastEvents } = splitEventsByEndDate(events);

  return (
    isFetched && (
      <PageContainer containerCss={[tw`px-0!`]}>
        <div tw="flex flex-row justify-between items-center mt-16 border-t-1 border-b-1 border-gray-light px-48 py-10">
          <Typography.H1>{organization?.title}</Typography.H1>
          <Typography.Body>
            {organization?.organizerDescription}
          </Typography.Body>
          <div tw="flex flex-row items-center justify-start gap-x-4">
            <MdLink tw="text-primary cursor-pointer" />
            <FaFacebook tw="text-primary cursor-pointer" />
            <Button.Text containerCss={[tw`pl-0 min-w-0`]}>
              KONTAKTIRAJ
            </Button.Text>
          </div>
        </div>
        <div tw="px-48 mt-20">
          <Typography.H1 containerCss={[tw`mb-4`]}>
            {t("liveEvents")}
          </Typography.H1>
          <EventGrid data={ongoingEvents} searchTerm={""} />
        </div>
        {pastEvents.length > 0 && (
          <div tw="px-48 mt-20">
            <Typography.H1 containerCss={[tw`mb-4`]}>
              {t("pastEvents")}
            </Typography.H1>

            <EventGrid data={pastEvents} searchTerm={""} />
          </div>
        )}
      </PageContainer>
    )
  );
};
