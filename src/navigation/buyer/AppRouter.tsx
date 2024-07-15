import "twin.macro";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "../../pages/admin/BaseLayout";
import { routes } from "./routing";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.admin.base} element={<BaseLayout />}>
        {/* <Route
          index
          element={<Navigate to={adminRoutes.homePage.overview} />}
        /> */}
        {/* <Route path={adminRoutes.homePage.overview} element={<Home />} /> */}
      </Route>

      <Route path="*" element={<Navigate to={routes.admin.base} />} />
    </Routes>
  );
};
