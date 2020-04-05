import Server from "./classes/server";
import router from "./routes/router";
import cors from "cors";
const server = Server.instance;

// CORS
server.app.use(cors({ origin: true, credentials: true }));
//ROUTES
server.app.use("/", router);

server.start();