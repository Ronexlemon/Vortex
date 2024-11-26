import asyncHandler from "express-async-handler";

import { Deposit,returnWinAmount } from "../services/onchain"
import { Response,Request } from "express"
import { ethers } from "ethers";
import { signer } from "../test/signer";


interface StakeRequestBody {
    //signer: ethers.Signer;
    amount: string;
  }
  
  const Stake = asyncHandler(async (req: Request,res:Response)=>{
    const {amount} = req.body
    console.log("body bodyy",req.body); 
    try{
        console.log("starting with the tx")
        const recipientAddress = await signer.getAddress()
        console.log("recipient address",recipientAddress)
        if (!recipientAddress){
             res.status(400).json({message: "User not logged in"})
             return
        }
        const depositTx = await Deposit(signer,amount)
        if(!depositTx){
             res.status(400).json({message:"Failed to stake"})
             return
        }
        const winAmount = await returnWinAmount(signer,recipientAddress as `0x${string}`,amount,0.1)
        if(!winAmount){
            res.status(400).json({message:"Failed to stake"})
            return
            }
            res.json({message:"Staked successfully"})
            }catch(err){
                console.log(err)
                res.status(400).json({message:"Failed to stake"})
                }
    

})

const test = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message : "getting the end piont"})
    return

})

export {Stake,test}