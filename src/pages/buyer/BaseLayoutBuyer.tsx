import { Outlet } from "react-router-dom";
import { HeaderBuyer } from "../../components/layout/HeaderBuyer";
import tw from "twin.macro";

export const BaseLayoutBuyer = () => {
  return (
    <div tw="flex flex-col min-h-screen ">
      <HeaderBuyer />
      <div tw="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
