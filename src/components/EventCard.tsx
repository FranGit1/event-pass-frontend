import { EventResDto } from "../types";
import { Typography } from "../ui/Typography";
import { formatDate } from "../utils";
import tw from "twin.macro";

interface IEventCardProps {
  event: EventResDto;
}

export const EventCard = ({ event }: IEventCardProps) => {
  return (
    <div tw="flex flex-col mx-5 my-8 bg-primary-500 w-fit p-4 min-w-[330px] gap-y-20 text-white rounded-xl">
      <Typography.H2>{event.title}</Typography.H2>

      <div tw="flex flex-row ">
        <Typography.Body>{formatDate(event.startDate)}-</Typography.Body>
        <Typography.Body>{formatDate(event.endDate)}</Typography.Body>
      </div>
    </div>
  );
};
