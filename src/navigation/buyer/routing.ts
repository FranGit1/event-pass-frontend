export const routes = {
  base: "/buyer",
  landing: {
    base: "home",
    organizationDetails: "organization-details/:organizationId",
    favorites: "favorites",
    contact: "contact",
  },
  eventDetails: "buyer/event/:eventId",
  auth: {
    login: "login",
    register: "register",
  },
};
