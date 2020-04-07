const request = require("request-promise");
import {
  TWITCH_BASE_URL_API,
  API_MAX_OBJECTS,
  CLIENT_ID,
  TOKEN_TWITCH,
  API_TOO_MANY_REQUEST_DELAY
} from "../global/environment";
import { GAMES, GameAnalytics } from "../global/gamesMetadata";
import Server from "../classes/server";
import { Request, Response } from "express";
import { TwitchStreamsResponse, TwitchStreamsData } from "../interfaces/twitch";

const server = Server.instance;

export const makeApiRequest = async (req: Request, res: Response) => {
  let dataFromTwitchApi: TwitchStreamsData[] = (await getStreams()) || [];
  if (dataFromTwitchApi.length === 0) {
    res.status(500).json({
      error: {
        statusCode: 500,
        message: "Too Many Requests"
      }
    });
    return;
  }
  const dataTransformed: GameAnalytics[] = getViewersByGameIds(
    dataFromTwitchApi,
    GAMES
  );
  server.io.emit("number-of-viewers", dataTransformed);
  res.json(dataTransformed);
};

const getStreams = async () => {
  let streams: TwitchStreamsData[] = [];
  let history: string[] = [];
  let keepGoing = true;
  let nextPosition: string = "";

  while (keepGoing) {
    // This is to avoid error 429 (TOO MANY REQUESTS)
    await sleep(API_TOO_MANY_REQUEST_DELAY);
    let response: TwitchStreamsResponse = await reqStreams(nextPosition);
    if (!response) {
      return;
    }
    if (response.pagination) {
      nextPosition = response.pagination.cursor;
    }
    await streams.push.apply(streams, response.data);
    let found = history.find(pointer => {
      return pointer === nextPosition;
    });
    let lastPage = response.data.find(stream => stream.viewer_count === 0);
    if (!nextPosition || found || lastPage) {
      keepGoing = false;
      return streams;
    }
    await history.push.apply(history, [nextPosition]);
  }
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const reqStreams = async (pointer: string) => {
  const config = {
    method: "GET",
    uri: createBaseUrl(
      GAMES.map(game => game.id),
      pointer
    ),
    json: true,
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${TOKEN_TWITCH}`
    }
  };
  try {
    let payload = await request(config);
    return payload;
  } catch (error) {
    console.log(error, "===error");
    return;
  }
};

function createBaseUrl(gamesId: string[], cursorPointer?: string) {
  return `${TWITCH_BASE_URL_API}?first=${API_MAX_OBJECTS}&`
    .concat(gamesId.map(id => `game_id=${id}`).join("&"))
    .concat(cursorPointer ? `&after=${cursorPointer}` : "");
}

function getViewersByGameIds(
  dataFromTwitchApi: TwitchStreamsData[],
  games: GameAnalytics[]
): GameAnalytics[] {
  const gamesCopy: GameAnalytics[] = games.map(game => game);
  const counters: any = {};
  dataFromTwitchApi.forEach((stream: any) => {
    if (counters[stream.game_id] === undefined) {
      counters[stream.game_id] = 0;
    }
    counters[stream.game_id] += stream.viewer_count;
  });
  gamesCopy.forEach(game => {
    if (counters[game.id]) {
      game.counter = counters[game.id];
    }
  });
  return gamesCopy;
}
