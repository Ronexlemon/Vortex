import { ethers } from "ethers"
import dotenv from "dotenv"
dotenv.config()


const alfajoresRpc = "https://alfajores-forno.celo-testnet.org"
const key = process.env.THETHING as string


const provider = new ethers.JsonRpcProvider(alfajoresRpc)
//create signer
export const signer = new ethers.Wallet(key,provider)