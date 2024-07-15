export const config = {
  VITE_APP_BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
  VITE_MAP_BOX_API_KEY: import.meta.env.VITE_APP_MAP_BOX_API_KEY,
  isAdminVersion: import.meta.env.VITE_APP_VERSION === "admin",
  isBuyerVersion: import.meta.env.VITE_APP_VERSION === "buyer",
  recaptchaSiteKey: import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY,
};
