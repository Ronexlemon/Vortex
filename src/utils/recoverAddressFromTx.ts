import { ethers } from "ethers";
interface returnedResult{
    address: string,
    
}
import { provider } from "../test/signer";
export async function recoverAddressFromTxHash(txHash: string): Promise<returnedResult> {
    // Connect to a JSON-RPC provider
   
  
    // Fetch the transaction details using the hash
    const tx = await provider.getTransaction(txHash);
  
   
   
  
    return {address:tx?.from as string};
  }