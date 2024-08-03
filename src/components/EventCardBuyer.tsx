import { EventResDto, FetchedEventDataBuyer } from "../types";
import { Typography } from "../ui/Typography";
import {
  formatDateBuyer,
  formatDateDayOfTheMonth,
  formatDateNameOfTheMonth,
} from "../utils";
import tw from "twin.macro";
import { CiHeart } from "react-icons/ci";
import { useNavigation } from "../hooks/use-navigation";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { useEffect, useState } from "react";
import { useGetFavoritesForBuyerIdsOnly } from "../queries";
import { IoMdHeart } from "react-icons/io";
import { Button } from "../ui/buttons/Button";
import { toast } from "../ui/indicators/Toast";
import useAuth from "../hooks/auth/useAuth";
import { useTranslation } from "react-i18next";

interface IEventCardProps {
  event: FetchedEventDataBuyer | EventResDto;
}

export const EventCard = ({ event }: IEventCardProps) => {
  const { navigate } = useNavigation();
  const [alreadyInFavorites, setAlreadyInFavorites] = useState<boolean>(false);
  const { data, refetch } = useGetFavoritesForBuyerIdsOnly();
  const { auth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      for (const favorite of data) {
        if (favorite.id === event.id) {
          setAlreadyInFavorites(true);
          break;
        }
      }
    }
  }, [data, event.id]);

  const addToFavorites = useMutation({
    mutationFn: () => http.addEventToFavorite({ id: event.id }),
    onSuccess: () => {
      setAlreadyInFavorites(true);
      refetch();
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: () => http.removeEventFavorite(Number(event.id)),
    onSuccess: () => {
      setAlreadyInFavorites(false);
      refetch();
    },
  });

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
          <Button.Text
            leadCss={[tw`w-5 h-5 text-primary-600`]}
            containerCss={[tw`min-w-0 pr-1`]}
            lead={alreadyInFavorites ? IoMdHeart : CiHeart}
            onClick={async (e) => {
              e.stopPropagation();
              if (!auth.token) {
                toast.error(t("logintoSave"));
                return;
              }

              if (alreadyInFavorites) {
                setAlreadyInFavorites(false);
                toast.info(t("removeFromFavorites"));

                await removeFromFavorites.mutateAsync();
              } else {
                console.log("called");

                setAlreadyInFavorites(true);
                toast.success(t("addedToFavorites"));
                await addToFavorites.mutateAsync();
              }
            }}
          ></Button.Text>{" "}
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
