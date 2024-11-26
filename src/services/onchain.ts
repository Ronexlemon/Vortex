import { ethers,Contract, formatEther, parseEther } from "ethers";
import erc20Abi from "../abi/erc20.json"
import { cusdContractAddress,VortexAddress } from "../constant/contractAddress";
import { createOrUpdateProfit } from "./prediction";

const Deposit = async(signer:ethers.Signer,amount:string)=>{
    const contract  = await CreateContract(signer)
    try{
        const tx = await contract.transfer(VortexAddress,parseEther(amount))
        await tx.wait()
        
        console.log("Deposit Success")
        return tx;
        

    }catch(err){
        console.log(err)
        throw err

    }

   
}

const returnWinAmount = async(signer:ethers.Signer,recipientAddress:`0x${string}`,amount:string,winProbability :number)=>{
    const contract  = await CreateContract(signer)
    try{
        const amountInWei = ethers.parseEther((Number(amount) * winProbability).toString()  ); // Convert input amount to Wei
        // const winAmountInWei = Number(amountInWei) * winProbability
         console.log("win Amount",amountInWei)
         let profit;
         if (amountInWei  < parseEther(amount)){
            profit = formatEther(ethers.parseEther(amount) - amountInWei)

         }else{
            profit = formatEther(amountInWei - ethers.parseEther(amount))
         }
         

        const tx = await contract.transfer(recipientAddress,amountInWei)
        await tx.wait()
        await createOrUpdateProfit(Number(profit))
        
        console.log("Return Win Amount Success")
        return tx;
    }catch(err){
        console.log(err)
        throw err
    }
}

const CreateContract = async(signer:ethers.Signer):Promise<ethers.Contract>=>{
    const contract = new Contract(cusdContractAddress,erc20Abi,signer)
    return contract


}
export {Deposit,returnWinAmount};