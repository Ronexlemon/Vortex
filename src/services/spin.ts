import { generateProbability } from "../hook/generateProbability";
import { configurePrizes } from "./prediction";

const Spin = async(betAmount:string)=>{
    const probability =  generateProbability(await configurePrizes())
    return probability


}
export {Spin}
