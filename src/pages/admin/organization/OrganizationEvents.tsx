import { Link, useParams } from "react-router-dom";
import { useGetOrganizationEvents } from "../../../queries";
import { PageContainer } from "../../../components/layout/PageContainer";
import { EventResDto, Organization } from "../../../types";
import { EventCardAdmin } from "../../../components/EventCardAdmin";
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
import { useSetRecoilState } from "recoil";
import { adminSelectedEventIdAtom } from "../../../recoil/atoms/adminSelectedEventIdAtom";

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
  const setEventIdValue = useSetRecoilState(adminSelectedEventIdAtom);
  const leaveOrganizationMutation = useMutation({
    mutationFn: () => http.leaveOrganization(Number(organizationId)),
    onSuccess: (response) => {
      navigate(routes.base);
    },
  });

  return isFetched ? (
    <PageContainer containerCss={[tw`w-full ml-0 mt-14 pl-0!`]}>
      <Button.Text
        containerCss={[tw` self-start mt-4 pb-4 hidden min-w-0 pl-16 md:flex`]}
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
        <div tw="flex flex-row items-center gap-x-4 my-4">
          <Button.Contained
            containerCss={[tw`min-w-[11.6rem]!`]}
            onClick={() => {
              if (organization) {
                navigate(
                  `/admin/${routes.eventCreation.base}/${organization.id}`
                );
              }
            }}
          >
            {t("createEvent")}
          </Button.Contained>
          <Button.Outlined
            containerCss={[tw`w-fit`]}
            onClick={() => {
              leaveOrganizationMutation.mutateAsync();
            }}
          >
            Leave organization
          </Button.Outlined>
        </div>
      </div>

      <Tabs
        containerCss={[tw``]}
        showTabOnTop={true}
        componentWrapperCss={[tw`px-0 my-1`]}
      >
        <Tabs.Item text="Live Events" hideBorderBottom={true}>
          <div tw=" flex flex-row flex-wrap">
            {upcomingEvents?.map((event: EventResDto) => {
              return (
                <Link
                  to={`/admin/${routes.eventCreation.base}/${organization?.id}`}
                  onClick={() => {
                    setEventIdValue(event.id);
                  }}
                  key={event.id + 100}
                >
                  <EventCardAdmin event={event} key={event.id} />
                </Link>
              );
            })}
          </div>
        </Tabs.Item>
        <Tabs.Item text="Past Events" hideBorderBottom={true}>
          <div tw=" flex flex-row flex-wrap w-full">
            {pastEvents?.map((event: EventResDto) => {
              return (
                <Link
                  to={`/admin/${routes.eventCreation.base}/${organization?.id}`}
                  onClick={() => {
                    setEventIdValue(event.id);
                  }}
                  key={event.id + 100}
                >
                  <EventCardAdmin
                    event={event}
                    tw="cursor-pointer"
                    key={event.id}
                  />
                </Link>
              );
            })}
          </div>
        </Tabs.Item>
      </Tabs>
    </PageContainer>
  ) : (
    <div>Loading</div>
  );
};
