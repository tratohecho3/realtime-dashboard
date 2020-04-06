import { Router } from "express";
import { makeApiRequest } from "../controllers/twitch";

const router = Router();

router.get("/games/analytics", makeApiRequest);

export default router;
