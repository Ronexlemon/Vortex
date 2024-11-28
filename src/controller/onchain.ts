import asyncHandler from "express-async-handler";

import { Deposit,returnWinAmount } from "../services/onchain"
import { Response,Request } from "express"
import { ethers } from "ethers";
//import { signer } from "../test/signer";
import { Spin } from "../services/spin";
import { empty } from "@prisma/client/runtime/library";
import { addOrUpdatePrizes } from "../services/prediction";


interface StakeRequestBody {
    signer: ethers.Signer;
    amount: string;
  }
  
  const Stake = asyncHandler(async (req: Request,res:Response)=>{
    const {amount,signer} = req.body
    console.log("body bodyy",req.body); 
    try{
        await addOrUpdatePrizes()
        const probabilities = await Spin()
        if (!probabilities || probabilities.length === 0) {
            res.status(400).json({ message: "Failed to spin" });
            return;
          }
        const pro = probabilities.filter((prob)=>prob.probability === 100);
        console.log("starting with the tx choosing prob",pro)
        const recipientAddress = await signer.getAddress()
        console.log("recipient address",recipientAddress)
        if (!recipientAddress){
             res.status(400).json({message: "User not logged in"})
             return
        }
        const depositTx = await Deposit(signer,amount)
        if(!depositTx){
             res.status(400).json({message:"Failed to stake Deposit"})
             return
        }
        const winAmount = await returnWinAmount(signer,recipientAddress as `0x${string}`,amount,pro[0].value)
        if(!winAmount){
            res.status(400).json({message:"Failed to return winnings"})
            return
            }
            res.json({message:"Staked successfully",data:pro[0]})
            }catch(err){
                console.log(err)
                res.status(400).json({message:"Failed to stake error",err})
                }
    

})

const test = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message : "getting the end piont"})
    return

})

export {Stake,test}