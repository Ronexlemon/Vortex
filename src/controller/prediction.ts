//predion controller
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getTodaysProfit,configurePrizes,addOrUpdatePrizes, } from "../services/prediction";
import { Spin } from "../services/spin";

const TodaysProfit = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const data = await getTodaysProfit()
        res.status(200).json(data)
    }catch(err:any){
        console.log("profit todays",err)
        res.status(500).json({message:err.message})

    }
})
const ConfigurePrizes = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const data = await configurePrizes()
        res.status(200).json({message:data})
        }catch(err:any){
            console.log("configure prizes",err)
            res.status(500).json({message:err.message})
            }
            })
            const AddOrUpdatePrizes = asyncHandler(async(req:Request,res:Response)=>{
                try{
                    const data = await addOrUpdatePrizes()
                    res.status(200).json({message:data})
                    }catch(err:any){
                        console.log("add or update prizes",err)
                        res.status(500).json({message:err.message})
                        }
                        })

                        const Spins = asyncHandler(async(req:Request,res:Response)=>{
                            const {betAmount}= req.body
                            try{
                                const data = await Spin()
                                res.status(200).json({message:data})
                                }catch(err:any){
                                    console.log("spin",err)
                                    res.status(500).json({message:err.message})
                                    }
                                    })
export {TodaysProfit,ConfigurePrizes,AddOrUpdatePrizes,Spins}