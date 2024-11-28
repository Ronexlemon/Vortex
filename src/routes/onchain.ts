// onchain route (src/routes/onchain.ts)
import { Router } from "express";
import { Stake,test,StakeSign } from "../controller/onchain";

const router = Router();
router.post("/spin", Stake);
router.get("/test",test)
router.post("/Spinsign",StakeSign)

export default router;
