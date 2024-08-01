import { FetchedEventDataBuyer } from "../types";
import { Typography } from "../ui/Typography";
import {
  formatDateBuyer,
  formatDateDayOfTheMonth,
  formatDateNameOfTheMonth,
} from "../utils";
import tw from "twin.macro";
import { CiHeart } from "react-icons/ci";
import { useNavigation } from "../hooks/use-navigation";

interface IEventCardProps {
  event: FetchedEventDataBuyer;
}

export const EventCard = ({ event }: IEventCardProps) => {
  const { navigate } = useNavigation();
  return (
    <div
      tw="flex flex-col  p-4 max-w-[22rem] rounded-xl cursor-pointer"
      onClick={() => {
        navigate(`/buyer/event/${event.id}`);
      }}
    >
      <div
        css={[tw`rounded-t-xl relative`]}
        style={{
          backgroundImage: `url(${event.featuredImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "10rem",
        }}
      >
        <div tw="absolute bottom-2 cursor-pointer right-4 w-6 h-6 bg-white flex items-center justify-center rounded-full transition-transform duration-300  hover:(scale-105)">
          <CiHeart tw="w-5 h-5 text-primary-600" />
        </div>
      </div>

      <div tw="flex flex-row bg-gray-600 gap-x-4 pt-4 px-4 pb-8 rounded-b-xl  min-h-[9.5rem]">
        <div tw="flex flex-col">
          <Typography.Body containerCss={[tw`text-primary-500 uppercase`]}>
            {formatDateNameOfTheMonth(event.startDate)}
          </Typography.Body>
          <Typography.H3>
            {formatDateDayOfTheMonth(event.startDate)}
          </Typography.H3>
        </div>
        <div>
          <Typography.H3 containerCss={[tw`text-primary-500 pb-2`]}>
            {event.title}
          </Typography.H3>
          <div tw="flex flex-col">
            <Typography.Body>
              {formatDateBuyer(event.startDate)}
            </Typography.Body>
            <Typography.Body>{event.organization.title}</Typography.Body>
          </div>
        </div>
      </div>
    </div>
  );
};
