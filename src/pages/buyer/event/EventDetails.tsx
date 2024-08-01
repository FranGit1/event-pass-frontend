import { useParams } from "react-router-dom";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useGetEventByEventId } from "../../../queries";
import { FetchedEventData } from "../../../types";
import tw from "twin.macro";

export const EventDetails = () => {
  const { eventId } = useParams();

  const { data, isFetched } = useGetEventByEventId(Number(eventId));

  console.log(data);

  return <PageContainer containerCss={[tw` `]}></PageContainer>;
};
