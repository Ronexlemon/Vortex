import { ethers,Contract, formatEther } from "ethers";
import erc20Abi from "../abi/erc20.json"
import { cusdContractAddress,VortexAddress } from "../constant/contractAddress";

const Deposit = async(signer:ethers.Signer,amount:bigint)=>{
    const contract  = await CreateContract(signer)
    try{
        const tx = await contract.transfer(VortexAddress,amount)
        await tx.wait()
        console.log("Deposit Success")
        return tx;
        

    }catch(err){
        console.log(err)
        throw err

    }

   
}

const returnWinAmount = async(signer:ethers.Signer,recipientAddress:`0x${string}`,amount:bigint,winProbability :number)=>{
    const contract  = await CreateContract(signer)
    try{
        const totalAmount = formatEther(Number(amount) * winProbability)
        const tx = await contract.transfer(recipientAddress,totalAmount)
        await tx.wait()
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