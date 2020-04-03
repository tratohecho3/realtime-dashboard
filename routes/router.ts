import { Router, Request, Response } from "express";

const router = Router();

router.get("/games/analytics", (req: Request, res: Response) => {
  res.json({ ok: "Games" });
});

export default router;
