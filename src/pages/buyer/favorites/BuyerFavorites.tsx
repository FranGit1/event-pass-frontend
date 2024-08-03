import { useTranslation } from "react-i18next";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useGetFavoritesForBuyer } from "../../../queries";
import { useNavigation } from "../../../hooks/use-navigation";
import { FetchedEventDataBuyer } from "../../../types";
import EventGrid from "../../../components/layout/EventGrid";
import { Typography } from "../../../ui/Typography";
import tw from "twin.macro";

export const BuyerFavorites = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { data, isFetched, refetch } = useGetFavoritesForBuyer();
  const favoriteEvents: FetchedEventDataBuyer[] = data || [];

  return (
    isFetched && (
      <PageContainer containerCss={[tw`px-48!`]}>
        <Typography.H1 containerCss={[tw`mt-10`]}>
          {t("myFavorites")}
        </Typography.H1>

        <div tw="mt-10">
          {favoriteEvents.length === 0 ? (
            <div tw="flex flex-col items-center justify-center h-[50vh] gap-y-4 px-12 text-center ">
              <Typography.H2>{t("noFavoritesTitle")}</Typography.H2>
              <Typography.Body>{t("noFavorites")}</Typography.Body>
            </div>
          ) : (
            <EventGrid data={favoriteEvents} searchTerm="" />
          )}
        </div>
      </PageContainer>
    )
  );
};
