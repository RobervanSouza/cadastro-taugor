// eslint-disable-next-line no-undef
const {
  VITE_REACT_APP_API_KEY,
  VITE_REACT_APP_AUTH_DOMAIN,
  VITE_REACT_APP_PROJECT_ID,
  VITE_REACT_APP_STORAGE_BUCKET,
  VITE_REACT_APP_MESSAGING_SENDER_ID,
  VITE_REACT_APP_APP_ID,
  VITE_REACT_APP_MEASUREMENT_ID,
  VITE_REACT_APP_ADMIN_EMAIL,
} = import.meta.env;

export const API_KEY = VITE_REACT_APP_API_KEY;
export const AUTH_DOMAIN = VITE_REACT_APP_AUTH_DOMAIN;
export const PROJECT_ID = VITE_REACT_APP_PROJECT_ID;
export const STORAGE_BUCKET = VITE_REACT_APP_STORAGE_BUCKET;
export const MESSAGING_SENDER_ID = VITE_REACT_APP_MESSAGING_SENDER_ID;
export const APP_ID = VITE_REACT_APP_APP_ID;
export const MEASUREMENT_ID = VITE_REACT_APP_MEASUREMENT_ID;
export const emailAdm = VITE_REACT_APP_ADMIN_EMAIL;
