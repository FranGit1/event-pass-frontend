import "twin.macro";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { BaseLayoutBuyer } from "../../pages/buyer/BaseLayoutBuyer";
import { routes } from "./routing";
import { Landing } from "../../pages/buyer/home/Landing";
import { EventDetails } from "../../pages/buyer/event/EventDetails";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.base} element={<BaseLayoutBuyer />}>
        <Route index element={<Navigate to={routes.landing.base} />} />
        <Route path={routes.landing.base} element={<Landing />} />
        <Route path={routes.landing.eventDetails} element={<EventDetails />} />
      </Route>

      <Route path="*" element={<Navigate to={routes.base} />} />
    </Routes>
  );
};
