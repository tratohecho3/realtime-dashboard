import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { GraphData } from "../classes/graph";
import { makeApiRequest } from "../controllers/twitch";
const router = Router();
const graph = new GraphData();
router.get("/games/analytics", (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.emit("number-of-viewers", graph.getGraphData());
  res.json(graph.getGraphData());
});

router.get("/games/analytics2", makeApiRequest);

export default router;
