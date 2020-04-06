// import { GameAnalytics } from "./global/gamesMetadata";

declare namespace Express {
  export interface Request {
    currentPage: string;
    data: any;
    nextPage: string;
    paginationHistory: string[];
  }
}
