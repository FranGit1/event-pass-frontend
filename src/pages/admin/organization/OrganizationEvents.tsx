import { useParams } from "react-router-dom";
import { useGetOrganizationEvents } from "../../../queries";
import { PageContainer } from "../../../components/layout/PageContainer";
import { EventResDto, Organization } from "../../../types";
import { EventCard } from "../../../components/EventCard";
import tw from "twin.macro";
import { Tabs } from "../../../ui/layout/Tabs";
import { separateEvents } from "../../../utils";
import { Typography } from "../../../ui/Typography";

export const OrganizationEvents = () => {
  const { organizationId } = useParams();

  const { data, isFetched } = useGetOrganizationEvents(
    Number(organizationId) | 0
  );
  const organization: Organization | undefined = data?.organization;
  const events: EventResDto[] = data?.events || [];
  const { pastEvents, upcomingEvents } = separateEvents(events);

  return isFetched ? (
    <PageContainer containerCss={[tw`w-1/2 ml-0 mt-14 pl-0!`]}>
      <div tw="flex items-center ml-16">
        <img
          src={organization?.organizerLogo ? organization.organizerLogo : ""}
          tw="w-20 h-20"
        />

        <Typography.H2>{organization?.title}</Typography.H2>
      </div>

      <Tabs
        containerCss={[tw``]}
        showTabOnTop={true}
        componentWrapperCss={[tw`px-0 my-1`]}
      >
        <Tabs.Item text="Live Events" hideBorderBottom={true}>
          <div tw=" flex flex-row flex-wrap">
            {upcomingEvents?.map((event: EventResDto) => {
              return <EventCard event={event} />;
            })}
          </div>
        </Tabs.Item>
        <Tabs.Item text="Past Events" hideBorderBottom={true}>
          <div tw=" flex flex-row flex-wrap">
            {pastEvents?.map((event: EventResDto) => {
              return <EventCard event={event} />;
            })}
          </div>
        </Tabs.Item>
      </Tabs>
    </PageContainer>
  ) : (
    <div>Loading</div>
  );
};
