//prediction routes
import  Express  from "express";
import { TodaysProfit,ConfigurePrizes } from "../controller/prediction";
const router = Express.Router()
//all controller files goes in here for prediction
router.get("/todaysprofit", TodaysProfit);
router.get("/configureprizes", ConfigurePrizes);

export default router

