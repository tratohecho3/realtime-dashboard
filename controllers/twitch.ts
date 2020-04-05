import { Request, Response } from "express";
import { GAMES, GameAnalytics } from "../global/gamesMetadata";
import {
  TWITCH_BASE_URL_API,
  API_MAX_OBJECTS,
  CLIENT_ID
} from "../global/environment";
import { url } from "inspector";

const axios = require("axios").default;

function getViewersByGameIds(
  data: any,
  games: GameAnalytics[]
): GameAnalytics[] {
  const dataCopy: GameAnalytics[] = games.map(game => game);
  const counters = {};
  const timestamp = Date.now();
  data.data.forEach((stream: any) => {
    if (counters[stream.game_id] === undefined) {
      counters[stream.game_id] = 0;
    }
    counters[stream.game_id] += stream.viewer_count;
  });
  dataCopy.forEach(game => {
    if (counters[game.id]) {
      game.counter = counters[game.id];
      game.timestamp = timestamp;
    }
  });
  return dataCopy;
}

function createBaseUrl(gamesId: string[], cursorPointer?: string) {
  return `${TWITCH_BASE_URL_API}?first=${API_MAX_OBJECTS}&`
    .concat(gamesId.map(id => `game_id=${id}`).join("&"))
    .concat(cursorPointer ? `&after=${cursorPointer}` : "");
}

export function makeApiRequest(req: Request, res: Response) {
  let config = {
    headers: {
      "Client-ID": CLIENT_ID
    }
  };
  axios
    .get(createBaseUrl(GAMES.map(game => game.id)), config)
    .then(function(response: any) {
      // handle success
      const dataTransformed = getViewersByGameIds(response.data, GAMES);
      res.json(dataTransformed);
    })
    .catch(function(error: any) {
      // handle error
      console.log(error);
    });
}
