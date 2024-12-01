// onchain route (src/routes/onchain.ts)
import { Router } from "express";
import { Stake,test,StakeSign,StakeSignWithHash } from "../controller/onchain";

const router = Router();
router.post("/spin", Stake);
router.get("/test",test)
router.post("/Spinsign",StakeSign)
router.post("/Spinsignwithhash",StakeSignWithHash)

export default router;
