import { EventResDto, FetchedEventDataBuyer } from "../types";
import { Typography } from "../ui/Typography";
import {
  formatDate,
  formatDateBuyer,
  formatDateDayOfTheMonth,
  formatDateNameOfTheMonth,
} from "../utils";
import tw from "twin.macro";

interface IEventCardProps {
  event: FetchedEventDataBuyer;
}

export const EventCard = ({ event }: IEventCardProps) => {
  return (
    <div tw="flex flex-col  p-4 max-w-[22rem] rounded-xl">
      <div
        css={[tw`rounded-t-xl`]}
        style={{
          backgroundImage: `url(${event.featuredImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "10rem",
        }}
      ></div>

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
