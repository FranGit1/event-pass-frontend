import Carousel from "react-multi-carousel";
import { FetchedEventData } from "../types";
import { ReactComponent as ChevronLeft } from "../assets/icons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/icons/chevron-right.svg";
import { responsiveSingle } from "../utils/breakpoints";
import tw from "twin.macro";

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
  return (
    <Carousel
      css={[tw`max-w-full mt-20 overflow-x-hidden`]}
      showDots
      infinite
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      containerClass="container"
      slidesToSlide={1}
      responsive={responsiveSingle}
      tw="flex self-center rounded-lg"
    >
      {sliderEvents.map((event, index) => (
        <img
          key={index}
          src={event.featuredImage}
          alt={`event image ${index}`}
          css={[
            tw`h-120 object-cover w-full md:(h-120  object-cover  rounded-lg	)`,
          ]}
        />
      ))}
    </Carousel>
  );
};
