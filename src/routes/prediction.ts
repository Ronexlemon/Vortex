//prediction routes
import  Express  from "express";
import { TodaysProfit } from "../controller/prediction";
const router = Express.Router()
//all controller files goes in here for prediction
router.get("/todaysprofit", TodaysProfit);

export default router

