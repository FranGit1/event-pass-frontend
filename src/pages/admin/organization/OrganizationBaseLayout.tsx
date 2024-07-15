import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import { IComponentBaseProps } from "../../../types";
import { SidebarNavigation } from "../../../components/SidebarNavigation";
import { organizationSideBarItems } from "../../../navigation/admin/routing";

interface IBaseAdminnProps extends IComponentBaseProps {}

export const OrganizationBaseLayout = ({}: IBaseAdminnProps) => {
  return (
    <div tw="min-h-screen flex flex-col ">
      <div tw="h-full flex flex-row w-full">
        <SidebarNavigation sidebarItems={organizationSideBarItems} />
        <Outlet />
      </div>
    </div>
  );
};
