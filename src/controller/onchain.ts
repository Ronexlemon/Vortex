import asyncHandler from "async-handler"
import { Deposit,returnWinAmount } from "../services/onchain"
import { Response,Request } from "express"
import { ethers } from "ethers";


interface StakeRequestBody {
    signer: ethers.Signer;
    amount: bigint;
  }
  
  const Stake = asyncHandler(async (req: Request<{}, {}, StakeRequestBody>,res:Response)=>{
    const {signer,amount} = req.body
    try{
        const recipientAddress = await signer.getAddress()
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

export {Stake}