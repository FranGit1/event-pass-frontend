import tw from "twin.macro";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useGetLiveEvents } from "../../../queries";
import { FetchedEventData, FetchedEventDataBuyer } from "../../../types";
import { EventSlider } from "../../../components/EventSlider";
import { EventCard } from "../../../components/EventCardBuyer";

export const Landing = () => {
  const { data, isFetched } = useGetLiveEvents();
  const sliderEvents: FetchedEventDataBuyer[] = data
    ? data?.filter((event) => event.displayInSlider)
    : [];

  return (
    isFetched &&
    sliderEvents && (
      <PageContainer containerCss={[tw``]}>
        <EventSlider sliderEvents={sliderEvents} />

        <div tw="mt-20">
          {data?.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </PageContainer>
    )
  );
};
