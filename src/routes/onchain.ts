// onchain route (src/routes/onchain.ts)
import { Router } from "express";
import { Stake,test } from "../controller/onchain";

const router = Router();
router.post("/spin", Stake);
router.get("/test",test)

export default router;
