import express from "express";
import {
  SERVER_PORT,
  BASE_URL_DEV,
  BASE_URL_PROD
} from "../global/environment";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/socket";
const axios = require("axios").default;

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listenSockets();
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }
  private listenSockets() {
    console.log("Listening connections");
    this.io.on("connection", client => {
      console.log("Client connected");
      socket.sendAnalytics(this.io);
      socket.disconnect(client);
    });
  }

  private getRealTimeData() {
    if (process.env.NODE_ENV === "production") {
      axios(`${BASE_URL_PROD}/games/analytics`);
    } else {
      axios(`${BASE_URL_DEV}/games/analytics`);
    }
  }
  start() {
    this.httpServer.listen(this.port, () => {
      setInterval(() => {
        this.getRealTimeData();
      }, 25000);
      console.log(`Server Running on ${this.port}`);
    });
  }
}
