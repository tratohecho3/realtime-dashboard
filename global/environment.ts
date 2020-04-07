export const SERVER_PORT: number = Number(process.env.PORT) || 5000;
export const TWITCH_BASE_URL_API: string =
  "https://api.twitch.tv/helix/streams";
export const API_MAX_OBJECTS: number = 100;
export const CLIENT_ID: string = process.env.CLIENT_ID || "";
export const TOKEN_TWITCH: string = process.env.TOKEN_TWITCH || "";
export const API_TOO_MANY_REQUEST_CODE: number = 429;
export const API_TOO_MANY_REQUEST_DELAY: number = 3000;
export const BASE_URL_DEV: string = "http://localhost:5000";
export const BASE_URL_PROD: string = "https://dash-dna-staging.herokuapp.com";
