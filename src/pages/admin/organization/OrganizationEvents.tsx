import { useParams } from "react-router-dom";
import { useGetOrganizationEvents } from "../../../queries";
import { PageContainer } from "../../../components/layout/PageContainer";
import { EventResDto, Organization } from "../../../types";
import { EventCard } from "../../../components/EventCard";
import tw from "twin.macro";
import { Tabs } from "../../../ui/layout/Tabs";
import { separateEvents } from "../../../utils";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../http";
import { useNavigation } from "../../../hooks/use-navigation";
import { routes } from "../../../navigation/admin/routing";
import { IoChevronBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export const OrganizationEvents = () => {
  const { organizationId } = useParams();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { data, isFetched } = useGetOrganizationEvents(
    Number(organizationId) | 0
  );
  const organization: Organization | undefined = data?.organization;
  const events: EventResDto[] = data?.events || [];
  const { pastEvents, upcomingEvents } = separateEvents(events);

  const leaveOrganizationMutation = useMutation({
    mutationFn: () => http.leaveOrganization(Number(organizationId)),
    onSuccess: (response) => {
      navigate(routes.base);
    },
  });

  return isFetched ? (
    <PageContainer containerCss={[tw`w-1/2 ml-0 mt-14 pl-0!`]}>
      <Button.Text
        containerCss={[tw` self-start mt-10 pb-4 hidden min-w-0 pl-16 md:flex`]}
        lead={IoChevronBack}
        onClick={() => {
          navigate(routes.base);
        }}
      >
        {t("back")}
      </Button.Text>

      <div tw="flex flex-col  ml-16">
        <div tw="flex items-center">
          <img
            src={organization?.organizerLogo ? organization.organizerLogo : ""}
            tw="w-20 h-20"
          />

          <Typography.H2>{organization?.title}</Typography.H2>
        </div>
        <Button.Contained
          containerCss={[tw`w-fit mt-4`]}
          onClick={() => {
            leaveOrganizationMutation.mutateAsync();
          }}
        >
          Leave organization
        </Button.Contained>
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
