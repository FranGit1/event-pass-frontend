import Carousel from "react-multi-carousel";
import { FetchedEventData } from "../types";
import { ReactComponent as ChevronLeft } from "../assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/icons/chevron-right.svg";
import { responsiveSingle } from "../utils/breakpoints";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../hooks/use-navigation";

interface IEventSliderProps {
  sliderEvents: FetchedEventData[];
}

const CustomLeftArrow = ({ ...rest }) => (
  <ChevronLeft
    {...rest}
    tw="absolute top-1/2 left-75.75 cursor-pointer text-gray bg-white opacity-70 hover:(opacity-100) active:(border-2 border-primary opacity-100 duration-0) rounded-full p-2 w-10 h-10 shadow-md transition-all duration-300"
  />
);

const CustomRightArrow = ({ ...rest }) => (
  <ChevronRight
    {...rest}
    tw="absolute top-1/2 right-75.75 cursor-pointer text-gray bg-white opacity-70 hover:(opacity-100) active:(border-2 border-primary opacity-100 duration-0) rounded-full p-2 w-10 h-10 shadow-md transition-all duration-300"
  />
);

export const EventSlider = ({ sliderEvents }: IEventSliderProps) => {
  const { navigate } = useNavigation();

  const sortedSliderEvents = sliderEvents.sort(
    (a, b) => a.sliderPosition - b.sliderPosition
  );

  return (
    <Carousel
      css={[tw`max-w-full mt-20 overflow-x-hidden`]}
      showDots={true}
      infinite
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      containerClass="container"
      slidesToSlide={1}
      responsive={responsiveSingle}
      tw="flex self-center rounded-lg"
    >
      {sortedSliderEvents.map((event, index) => (
        <img
          key={index}
          src={event.featuredImage}
          onClick={() => {
            navigate(`/buyer/event/${event.id}`);
          }}
          alt={`event image ${index}`}
          css={[
            tw`h-120 object-cover w-full md:(h-120  object-cover rounded-lg cursor-pointer	)`,
          ]}
        />
      ))}
    </Carousel>
  );
};
