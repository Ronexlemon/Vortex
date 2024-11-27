//prediction routes
import  Express  from "express";
import { TodaysProfit,ConfigurePrizes,AddOrUpdatePrizes,Spins } from "../controller/prediction";
const router = Express.Router()
//all controller files goes in here for prediction
router.get("/todaysprofit", TodaysProfit);
router.get("/configureprizes", ConfigurePrizes);
router.post("/addorupdateprizes", AddOrUpdatePrizes);
router.get("/spins", Spins);

export default router

