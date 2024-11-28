import { ethers } from "ethers";

// Function to get the signer from the provider using the user address
const  getSigner= async(userAddress: string): Promise<ethers.Signer> =>{
  const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org", 44787);

  // Get the signer from the provider using the user's address
  const signer = provider.getSigner(userAddress);

  // Optionally, you can log the signer or perform some checks
  console.log("Signer address:", await (await signer).getAddress());
  
  return signer;
}
export {getSigner}


