//predion controller
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getTodaysProfit } from "../services/prediction";

const TodaysProfit = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const data = await getTodaysProfit()
        res.status(200).json(data)
    }catch(err:any){
        console.log("profit todays",err)
        res.status(500).json({message:err.message})

    }
})
export {TodaysProfit}