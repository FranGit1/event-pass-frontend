import { SidebarItem } from "../../utils";

import { BsFillPhoneFill } from "react-icons/bs";

export const routes = {
  base: "admin",
  organizations: "organizations",

  organization: {
    base: "organization",
    overview: ":organizationId",
    organizationEvents: ":organizationId/events",
    joinOrganization: "join-organization",
    generateJoinCode: "join-code-generation",
  },

  // organization: "organization/:",
  eventCreation: {
    base: "create-event",
    createEvent: ":organizationId",
  },
  auth: {
    login: "login",
    register: "register",
    accountCreated: `account-created`,
    accountCreationFail: `account-creation-fail`,
  },
};

export const organizationSideBarItems: SidebarItem[] = [
  {
    url: `/admin/organization/${routes.organization.organizationEvents}`,
    icons: { unselected: BsFillPhoneFill },
    label: "My events",
  },
  {
    url: `/admin/${routes.organizations}`,
    icons: { unselected: BsFillPhoneFill },
    label: "Organizations",
  },
];
