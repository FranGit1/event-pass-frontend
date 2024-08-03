import React, { useState } from "react";
import { EventResDto, FetchedEventDataBuyer } from "../../types";
import { EventCard } from "../EventCardBuyer";
import { Button } from "../../ui/buttons/Button";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import tw from "twin.macro";

interface IEventGridProps {
  data: FetchedEventDataBuyer[] | EventResDto[];
  searchTerm: string;
}

const EventGrid: React.FC<IEventGridProps> = ({ data, searchTerm }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const visibleData = expanded ? data : data.slice(0, 8);

  return (
    <div tw="flex flex-col ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {visibleData.map((event) => {
          if (
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.title === ""
          )
            return <EventCard key={event.id} event={event} />;
        })}
      </div>
      {data.length > 8 && (
        <Button.Outlined
          onClick={toggleExpand}
          trail={expanded ? IoChevronUp : IoChevronDown}
          containerCss={[tw`self-center my-10`]}
        >
          {expanded ? t("showLess") : t("showMore")}
        </Button.Outlined>
      )}
    </div>
  );
};

export default EventGrid;
