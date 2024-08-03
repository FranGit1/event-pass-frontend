import "twin.macro";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BaseLayoutBuyer } from "../../pages/buyer/BaseLayoutBuyer";
import { routes } from "./routing";
import { Landing } from "../../pages/buyer/home/Landing";
import { FetchEventDetails } from "../../pages/buyer/event/EventDetails";
import { OrganizationDetailsComponent } from "../../pages/buyer/organization/OrganizationDetails";
import { BuyerAuthTabsPage } from "../../pages/admin/auth/BuyerAuthTabsPage";
import { BuyerFavorites } from "../../pages/buyer/favorites/BuyerFavorites";
import RequiredAuth from "../../components/RequireAuth";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.base} element={<BaseLayoutBuyer />}>
        <Route index element={<Navigate to={routes.landing.base} />} />
        <Route path={routes.auth.login} element={<BuyerAuthTabsPage />} />

        <Route path={routes.landing.base} element={<Landing />} />
        <Route
          path={routes.landing.organizationDetails}
          element={<OrganizationDetailsComponent />}
        />
        <Route element={<RequiredAuth />}>
          <Route path={routes.landing.favorites} element={<BuyerFavorites />} />
        </Route>
      </Route>
      <Route path={routes.eventDetails} element={<FetchEventDetails />} />

      <Route path="*" element={<Navigate to={routes.base} />} />
    </Routes>
  );
};
