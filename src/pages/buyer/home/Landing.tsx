import tw from "twin.macro";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useGetLiveEvents } from "../../../queries";
import { FetchedEventDataBuyer } from "../../../types";
import { EventSlider } from "../../../components/EventSlider";
import { Typography } from "../../../ui/Typography";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../../fields/controlled/TextInput";
import { KeyboardEventHandler, useState } from "react";
import { ReactComponent as HighlightedSearch } from "../../../assets/icons/highlighted-search.svg";
import { ReactComponent as SvgIllustration } from "../../../assets/illustrations/saves-time-working.svg";
import { IoIosSearch } from "react-icons/io";
import EventGrid from "../../../components/layout/EventGrid";
import { Button } from "../../../ui/buttons/Button";

export const Landing = () => {
  const { data, isFetched } = useGetLiveEvents();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const sliderEvents: FetchedEventDataBuyer[] = data
    ? data?.filter((event) => event.displayInSlider)
    : [];

  const handleEnterClick: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchValue);
    }
  };

  return (
    isFetched &&
    data && (
      <PageContainer containerCss={[tw`flex flex-col`]}>
        <div tw="w-[60%] self-center">
          <EventSlider sliderEvents={sliderEvents} />
        </div>
        <div tw="mt-40 px-22">
          <div tw="px-10 mb-20">
            <Typography.H1 containerCss={[tw`max-w-104 mb-8 text-primary`]}>
              {t("searchEvents")}
            </Typography.H1>
            <TextInput.Rounded
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              containerCss={[tw`max-w-120 self-end`, searchTerm && tw`p-0`]}
              textCss={[searchTerm && tw`pl-4 ml-2`]}
              //@ts-ignore
              trail={searchTerm ? HighlightedSearch : IoIosSearch}
              trailCss={[tw`text-primary`, searchTerm && tw` w-12 h-12`]}
              placeholder={t("searchEventsPlaceholder")}
              onTrailIconClick={() => setSearchTerm(searchValue)}
              onKeyDown={handleEnterClick}
            ></TextInput.Rounded>
          </div>
          <EventGrid data={data} />
        </div>

        <div tw="flex flex-row justify-center items-start mt-20">
          <div tw="flex flex-col">
            <Typography.H1 containerCss={[tw`max-w-100 mt-20`]}>
              {t("landingCopy")}
            </Typography.H1>
            <Button.Contained containerCss={[tw`w-fit mt-8`]}>
              {t("contactUs")}
            </Button.Contained>
          </div>
          <SvgIllustration tw="w-[50%] h-[550px]" />
        </div>
      </PageContainer>
    )
  );
};
