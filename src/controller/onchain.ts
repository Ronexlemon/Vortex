import asyncHandler from "express-async-handler";

import { Deposit,returnWinAmount } from "../services/onchain"
import { Response,Request } from "express"
import { ethers } from "ethers";
import { signer as VortexSingener } from "../test/signer";
import { Spin } from "../services/spin";
import { empty } from "@prisma/client/runtime/library";
import { addOrUpdatePrizes } from "../services/prediction";
import { getSigner } from "../config/signer";
import { recoverAddressFromTxHash } from "../utils/recoverAddressFromTx";



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
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Failed to stake error",data:err.message})
                }
    

})

const test = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message : "getting the end piont"})
    return

})


const StakeSign = asyncHandler(async (req: Request, res: Response) => {
  const { signedTx, amount, userAddress } = req.body;

  console.log("Received signed transaction:", signedTx);
  console.log("Amount to stake:", amount);

  try {
    // Broadcast the signed transaction to the network
    const signer = await getSigner(userAddress)
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
    const txResponse = await signer.sendTransaction(signedTx);

    // Optionally, wait for the transaction to be mined
    const receipt = await txResponse.wait();
    if(!receipt){
      res.status(400).json({message:"Failed to stake Deposit"})
      return
 }
    const winAmount = await returnWinAmount(VortexSingener,recipientAddress as `0x${string}`,amount,pro[0].value)
        if(!winAmount){
            res.status(400).json({message:"Failed to return winnings"})
            return
            }

    // Send back the transaction receipt or success message
    res.json({
      success: true,
      message: "Transaction successfully broadcasted!",
      transactionHash: receipt,
      data:pro[0]
    });
  } catch (error) {
    console.error("Error broadcasting transaction:", error);
    res.status(500).json({ success: false, message: "Error broadcasting transaction" });
  }
});


//new
const StakeSignWithHash = asyncHandler(async (req: Request, res: Response) => {
  //const { signedTx, amount, userAddress } = req.body;
  const { txHash, address,amount } = req.body;

  console.log("Received signed transaction:", txHash);
  //console.log("Received signature:", signature);
  console.log("Amount to stake:", amount);

  try {
    // Broadcast the signed transaction to the network
    // const {address:recoveredAddress} =  await recoverAddressFromTxHash(txHash);
    // if (recoveredAddress.toLowerCase() != address.toLowerCase()) {
    //   res.status(200).json({ message: "Transaction Address is Invalid!" });
    //   return}
     


   
    await addOrUpdatePrizes()
        const probabilities = await Spin()
        if (!probabilities || probabilities.length === 0) {
            res.status(400).json({ message: "Failed to spin" });
            return;
          }
        const pro = probabilities.filter((prob)=>prob.probability === 100);
        console.log("starting with the tx choosing prob",pro)
        
        if (!address){
             res.status(400).json({message: "User not logged in"})
             return
        }
   
    const winAmount = await returnWinAmount(VortexSingener,address as `0x${string}`,amount,pro[0].value)
        if(!winAmount){
            res.status(400).json({message:"Failed to return winnings"})
            return
            }

    // Send back the transaction receipt or success message
    res.json({
      success: true,
      message: "Transaction successfully broadcasted!",
      transactionHash: winAmount,
      data:pro[0]
    });
  } catch (error) {
    console.error("Error broadcasting transaction:", error);
    res.status(500).json({ success: false, message: "Error broadcasting transaction",err:error });
  }
});

export {Stake,test,StakeSign,StakeSignWithHash}