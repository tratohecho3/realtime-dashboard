import Server from "./classes/server";
import router from "./routes/router";
import cors from "cors";
import express from "express";
import path = require("path");
const server = Server.instance;

// CORS
server.app.use(cors({ origin: true, credentials: true }));

if (process.env.NODE_ENV === "production") {
  server.app.use(
    express.static(path.join(process.cwd(), "/website/dist/website"))
  );
}

//ROUTES
server.app.use("/", router);

server.start();
