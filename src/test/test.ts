import axios from 'axios';
import { signer } from './signer';
import { ethers, formatEther } from 'ethers';

interface StakeRequestBody {
  signer: ethers.Signer; // Or type it according to your actual signer structure (e.g., string or object)
  amount: bigint | string;
}

const stake = async (signer: ethers.Signer, amount: bigint |string) => {
  const data: StakeRequestBody = {
    signer,
    amount,
  };

  try {
    console.log("starting .......")
    const response = await axios.post('http://localhost:3000/api/stake/spin', data);
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Stake transaction failed');
  }
};

// Example usage:
// Replace with actual signer address or object
const amount = formatEther("1");

stake(signer, amount);
