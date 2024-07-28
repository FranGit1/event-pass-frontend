import "twin.macro";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../../pages/admin/BaseLayout";
import { routes } from "./routing";
import { AuthTabsPage } from "../../pages/admin/auth/AuthTabsPage";
import { AdminHome } from "../../pages/admin/home/Home";
import { CreateEventData } from "../../pages/admin/organization/event-creation/CreateEvent";
import { OrganizationEvents } from "../../pages/admin/organization/OrganizationEvents";
import { OrganizationBaseLayout } from "../../pages/admin/organization/OrganizationBaseLayout";
import RequiredAuth from "../../components/RequireAuth";
import { JoinOrganization } from "../../pages/admin/organization/join-organization/JoinOrganization";
import { FetchGenerateCodeOrganizations } from "../../pages/admin/organization/join-organization/GenerateCode";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.base} element={<BaseLayout />}>
        <Route path={routes.auth.login} element={<AuthTabsPage />} />
        <Route element={<RequiredAuth />}>
          <Route index element={<Navigate to={routes.organizations} />} />
          <Route path={routes.organizations} element={<AdminHome />} />

          <Route
            path={routes.organization.base}
            element={<OrganizationBaseLayout />}
          >
            <Route
              path={routes.organization.organizationEvents}
              element={<OrganizationEvents />}
            />
            <Route
              path={routes.organization.joinOrganization}
              element={<JoinOrganization />}
            />
            <Route
              path={routes.organization.generateJoinCode}
              element={<FetchGenerateCodeOrganizations />}
            />
          </Route>

          <Route path={routes.eventCreation.base}>
            <Route
              path={routes.eventCreation.createEvent}
              element={<CreateEventData />}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={routes.base} />} />
    </Routes>
  );
};
