import tw from "twin.macro";
import { PageContainer } from "../../../components/layout/PageContainer";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../../hooks/use-navigation";
import { useGetFavoritesForOrganizer } from "../../../queries";
import { Organization } from "../../../types";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { RxChevronLeft } from "react-icons/rx";
import { OrganizationCard } from "../../../components/OrganizationCard";

export const Favorites = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { data, isFetched, refetch } = useGetFavoritesForOrganizer();
  const favorites: Organization[] = data;

  return (
    isFetched &&
    favorites && (
      <div css={[tw`ml-20 mt-14 pl-0! w-full`]}>
        <Button.Text
          containerCss={[tw`pl-0 mb-8 min-w-0`]}
          lead={RxChevronLeft}
          leadCss={[tw`w-5 h-5`]}
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("back")}
        </Button.Text>
        <Typography.H2>{t("myFavorites")}</Typography.H2>
        <div tw="mt-10">
          {favorites.length === 0 ? (
            <div tw="flex flex-col items-center justify-center h-[50vh] gap-y-4 px-12 text-center ">
              <Typography.H2>{t("noFavoritesTitle")}</Typography.H2>
              <Typography.Body>{t("noFavorites")}</Typography.Body>
            </div>
          ) : (
            <div>
              <div tw="flex flex-col items-center justify-center  md:(flex-row items-center justify-start flex-wrap gap-x-4)">
                {favorites.map((organization: Organization) => {
                  return (
                    <OrganizationCard
                      organization={organization}
                      key={organization.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};
