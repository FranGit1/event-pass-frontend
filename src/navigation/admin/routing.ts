import { SidebarItem } from "../../utils";

import { BsFillPhoneFill } from "react-icons/bs";

export const routes = {
  base: "admin",
  organizations: "organizations",

  organization: {
    base: "organization",
    overview: ":organizationId",
    organizationEvents: ":organizationId/events",
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
    url: "",
    icons: { unselected: BsFillPhoneFill },
    label: "Zahtjevi",
  },
  {
    url: "",
    icons: { unselected: BsFillPhoneFill },
    label: "Organizacije",
  },
  {
    url: "",
    icons: { unselected: BsFillPhoneFill },
    label: "Osobe",
  },
  {
    url: "routes.atheleteForm.affiliation",
    icons: { unselected: BsFillPhoneFill },
    label: "Slanje pošte",
  },
];
