import { useTranslation } from "react-i18next";
import { useNavigation } from "../hooks/use-navigation";
import { routes } from "../navigation/admin/routing";
import { Organization } from "../types";
import { Button } from "../ui/buttons/Button";
import { Typography } from "../ui/Typography";
import tw from "twin.macro";
import { useMutation } from "@tanstack/react-query";
import { http } from "../http";
import { useEffect, useState } from "react";
import useAuth from "../hooks/auth/useAuth";
import { useGetFavoritesForOrganizerIdsOnly } from "../queries";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { toast } from "../ui/indicators/Toast";
import { useSetRecoilState } from "recoil";
import { adminSelectedEventIdAtom } from "../recoil/atoms/adminSelectedEventIdAtom";
interface IOrganizationCardProps {
  organization: Organization;
}

export const OrganizationCard = ({ organization }: IOrganizationCardProps) => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const [alreadyInFavorites, setAlreadyInFavorites] = useState<boolean>(false);
  const { data, refetch } = useGetFavoritesForOrganizerIdsOnly();
  const { auth } = useAuth();
  const setEventIdValue = useSetRecoilState(adminSelectedEventIdAtom);

  useEffect(() => {
    if (data) {
      for (const favorite of data) {
        if (favorite.id === organization.id) {
          setAlreadyInFavorites(true);
          break;
        }
      }
    }
  }, [data, organization.id]);

  const addToFavorites = useMutation({
    mutationFn: () => http.addOrganizationToFavorite({ id: organization.id }),
    onSuccess: () => {
      setAlreadyInFavorites(true);
      refetch();
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: () => http.removeOrganizationFavorite(Number(organization.id)),
    onSuccess: () => {
      setAlreadyInFavorites(false);
      refetch();
    },
  });

  return (
    <div tw="w-100 rounded-3xl border-1 border-gray-400 ">
      <div
        tw="flex flex-row items-center justify-between bg-gray-100 rounded-t-3xl p-4 cursor-pointer"
        onClick={() =>
          navigate(
            `/admin/${routes.organization.base}/${organization.id}/events`
          )
        }
      >
        <div tw="flex flex-col">
          <div tw="flex items-center gap-x-4">
            <img
              src={
                organization?.organizerLogo ? organization.organizerLogo : ""
              }
              tw="w-12 h-12"
            />
            <div tw="flex flex-col ">
              <Typography.H2>{organization.title}</Typography.H2>
              <Typography.FooterText>
                {organization.legalName}
              </Typography.FooterText>
            </div>
          </div>
          <Typography.H3>{organization.organizer}</Typography.H3>
        </div>
        <div>
          <Button.Text
            leadCss={[tw`w-6 h-6 text-primary`]}
            containerCss={[tw`min-w-0 pr-0`]}
            lead={alreadyInFavorites ? IoMdHeart : IoMdHeartEmpty}
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
                setAlreadyInFavorites(true);
                toast.success(t("addedToFavorites"));
                await addToFavorites.mutateAsync();
              }
            }}
          ></Button.Text>{" "}
        </div>
      </div>
      <div tw="flex flex-row items-center justify-between p-4">
        <Typography.FooterText containerCss={[tw``]}>
          {organization.liveEventsCount} {t("liveEvents")}
        </Typography.FooterText>
        <Button.Contained
          onClick={() => {
            setEventIdValue(undefined);
            navigate(`/admin/${routes.eventCreation.base}/${organization.id}`);
          }}
        >
          {t("createEvent")}
        </Button.Contained>
      </div>
    </div>
  );
};
