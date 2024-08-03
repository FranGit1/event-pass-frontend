import { useParams } from "react-router-dom";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useGetEventByEventId, useGetOrganizationById } from "../../../queries";
import { RiShareForwardFill } from "react-icons/ri";
import tw from "twin.macro";
import {
  formatDateDayOfTheMonth,
  formatDateNameOfTheMonth,
  getTimeFromDate,
} from "../../../utils";
import { Typography } from "../../../ui/Typography";
import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/buttons/Button";
import { MapView } from "../../../components/MapView";
import { FetchedEventDataBuyer } from "../../../types";
import { MdLink } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { useNavigation } from "../../../hooks/use-navigation";

export const FetchEventDetails = () => {
  const { eventId } = useParams();

  const { data } = useGetEventByEventId(Number(eventId));

  return data && <EventDetails event={data} />;
};

interface IEventDetailsProps {
  event: FetchedEventDataBuyer;
}

const EventDetails = ({ event }: IEventDetailsProps) => {
  const { t } = useTranslation();
  const { data: organization } = useGetOrganizationById(event.organization.id);
  const { navigate } = useNavigation();
  console.log(organization);

  return (
    event && (
      <PageContainer
        containerCss={[tw` flex flex-col justify-center items-center`]}
      >
        <div tw="w-[70%] flex flex-col">
          <div tw="relative">
            <img src={event?.featuredImage} tw="h-120 object-cover w-full" />
            <div tw="flex justify-center items-center bg-primary p-4 rounded-full w-fit transition-transform duration-300 cursor-pointer hover:(scale-105) absolute top-[34.8rem] right-10">
              <RiShareForwardFill tw="text-white" />
            </div>
          </div>
          <div tw="flex flex-row w-full justify-between pt-10 pb-6 bg-gray-200 px-10">
            <div tw="flex flex-row gap-x-14">
              <div tw="w-fit">
                <div tw="flex flex-col border-b-2 border-primary items-center justify-center pb-2 mb-2">
                  <Typography.Body containerCss={[tw`text-primary uppercase`]}>
                    {formatDateNameOfTheMonth(event.startDate)}
                  </Typography.Body>
                  <Typography.H3>
                    {formatDateDayOfTheMonth(event.startDate)}
                  </Typography.H3>
                </div>

                <div tw="flex flex-col items-center justify-center">
                  <Typography.Body containerCss={[tw`text-primary uppercase`]}>
                    {formatDateNameOfTheMonth(event.endDate)}
                  </Typography.Body>
                  <Typography.H3>
                    {formatDateDayOfTheMonth(event.endDate)}
                  </Typography.H3>
                </div>
              </div>
              <div tw="flex flex-col">
                <Typography.H1 containerCss={[tw`mb-2`]}>
                  {event.title}
                </Typography.H1>
                <Typography.FooterText containerCss={[tw`mb-1`]}>
                  {t("organizes")} {event.organization.title} {t("atLocation")}{" "}
                  {event.location.name}
                </Typography.FooterText>
                <Typography.FooterText containerCss={[tw`mb-2`]}>
                  {event.topic.name}
                </Typography.FooterText>
                <Typography.Body>{event.price}EUR</Typography.Body>
              </div>
            </div>
            <Button.Contained containerCss={[tw`uppercase h-fit self-end`]}>
              {t("buyTickets")}
            </Button.Contained>
          </div>

          <div tw="px-32 py-14 flex flex-col">
            <Typography.Body containerCss={[tw`mb-10 md:mb-20 `]}>
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </Typography.Body>

            <Typography.FooterText containerCss={[tw`text-center mb-6  mt-10`]}>
              {t("dateTime")}
            </Typography.FooterText>
            <div tw="flex flex-row items-center self-center">
              <div tw="flex flex-row gap-x-2 items-center">
                <div tw="flex flex-col border-r-2 border-primary items-center justify-center pr-2 ">
                  <Typography.Body containerCss={[tw`text-primary uppercase`]}>
                    {formatDateNameOfTheMonth(event.startDate)}
                  </Typography.Body>
                  <Typography.H3>
                    {formatDateDayOfTheMonth(event.startDate)}
                  </Typography.H3>
                </div>
                <Typography.H2>
                  {getTimeFromDate(event.startDate)}
                </Typography.H2>
              </div>
              <div tw="border-t-2 border-primary w-4 h-2 mt-2 mx-6"></div>
              <div tw="flex flex-row gap-x-2 items-center">
                <div tw="flex flex-col border-r-2 border-primary items-center justify-center pr-2">
                  <Typography.Body containerCss={[tw`text-primary uppercase`]}>
                    {formatDateNameOfTheMonth(event.endDate)}
                  </Typography.Body>
                  <Typography.H3>
                    {formatDateDayOfTheMonth(event.endDate)}
                  </Typography.H3>
                </div>
                <Typography.H2 containerCss={[tw`pl-2`]}>
                  {getTimeFromDate(event.endDate)}
                </Typography.H2>
              </div>
            </div>
          </div>
          <MapView
            longitude={event.location.longitude}
            latitude={event.location.latitude}
          />
          <div
            tw="flex flex-row items-center mt-20 mb-10 gap-x-8 cursor-pointer"
            onClick={() => {
              navigate(`/buyer/organization-details/${event.organization.id}`);
            }}
          >
            <img
              src={organization?.organizerLogo}
              alt="org image"
              tw="w-24 h-24"
            />

            <div tw="flex flex-col w-full justify-start ">
              <Typography.FooterText containerCss={[tw`mb-4`]}>
                {t("organizes").charAt(0).toUpperCase() +
                  t("organizes").slice(1)}
              </Typography.FooterText>
              <Typography.H2 containerCss={[tw`mb-4 text-primary`]}>
                {organization?.title}
              </Typography.H2>
              <Typography.Body containerCss={[tw`mb-4`]}>
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
          </div>
        </div>
      </PageContainer>
    )
  );
};
