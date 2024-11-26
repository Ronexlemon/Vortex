//prediction routes
import  Express  from "express";
import { Stake } from "../controller/onchain";
const router = Express.Router()
//all controller files goes in here for prediction
router.post("/stake", Stake);


export default router

