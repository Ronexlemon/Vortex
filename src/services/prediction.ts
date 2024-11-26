//prediction services
import { prisma } from "../config/prisma";
import { getTodayRange } from "../hook/daterange";

//get daill profit
const getTodaysProfit =async()=> {
    try {
     const {todayEnd,todayStart} = getTodayRange()
  
      // Query for the total profit of today
      const result = await prisma.dailyProfit.aggregate({
        _sum: {
          Profit: true, // Sum up the Profit field
        },
        where: {
          Date: {
            gte: todayStart, // Greater than or equal to start of today
            lt: todayEnd,    // Less than the start of tomorrow
          },
        },
      });
  
      console.log('Total profit for today:', result._sum.Profit || 0);
      return result._sum.Profit || 0; // Return the total profit or 0 if null
    } catch (error) {
      console.error('Error calculating today\'s profit:', error);
      throw error;
    } 
  }

  //
  const configurePrizes =  async () => {
    try {
      const prizes_config = [];
      const profit = await getTodaysProfit();
  
      // Categorize profit ranges using Math.floor
      const profitRange = Math.floor(profit / 10000);  // Grouping into ranges of 10,000
  
      switch (profitRange) {
        case 0:
          // Profit <= 10,000
          prizes_config.push(
            { value: 1, probability: 50 },
            { value: 3, probability: 30 },
            { value: 7, probability: 20 }
          );
          break;
  
        case 1:
          // Profit > 10,000 and <= 20,000
          prizes_config.push(
            { value: 1, probability: 40 },
            { value: 2, probability: 30 },
            { value: 5, probability: 20 },
            { value: 10, probability: 10 }
          );
          break;
  
        case 2:
          // Profit > 20,000 and <= 30,000
          prizes_config.push(
            { value: 1, probability: 30 },
            { value: 3, probability: 25 },
            { value: 7, probability: 20 },
            { value: 10, probability: 25 }
          );
          break;
  
        case 3:
          // Profit > 30,000 and <= 50,000
          prizes_config.push(
            { value: 1, probability: 20 },
            { value: 2, probability: 25 },
            { value: 4, probability: 30 },
            { value: 10, probability: 25 }
          );
          break;
  
        case 4:
          // Profit > 50,000 and <= 100,000
          prizes_config.push(
            { value: 1, probability: 10 },
            { value: 3, probability: 20 },
            { value: 5, probability: 25 },
            { value: 8, probability: 45 }
          );
          break;
  
        case 5:
          // Profit > 100,000
          prizes_config.push(
            { value: 5, probability: 30 },
            { value: 10, probability: 25 },
            { value: 20, probability: 15 },
            { value: 50, probability: 30 }
          );
          break;
  
        default:
          // Handle unexpected profit ranges (if any)
          console.log("Unexpected profit value: ", profit);
          break;
      }
  
      // Log the prize configuration
      console.log("Prize Configuration:", prizes_config);
      return prizes_config;
    } catch (error) {
      console.error("Error configuring prizes:", error);
      throw error;
    }
  };

  //return
  const addOrUpdatePrizes = async () => {
    try {
      // Iterate over the prize_config array and process each prize
      const addedPrizes = [];
      const prize_config = await configurePrizes()
      for (let prize of prize_config) {
        const existingPrize = await prisma.prize.findFirst({
          where: {
            name: `X${prize.value}`,
            value: prize.value,
            probability: prize.probability
          }
        });
  
        if (!existingPrize) {
          // If the prize doesn't exist, create a new one
          const newPrize = await prisma.prize.create({
            data: {
              name: `X${prize.value}`,
              value: prize.value,
              probability: prize.probability,
              sentCount: 0, // Initial sent count is 0
            }
          });
          console.log(`Prize with value ${prize.value} and probability ${prize.probability} created.`);
          addedPrizes.push(newPrize);
        } else {
          // If the prize exists, log that it was skipped
          console.log(`Prize with value ${prize.value} and probability ${prize.probability} already exists.`);
          addedPrizes.push(existingPrize)
        }
      }
      return addedPrizes;
    } catch (error) {
      console.error('Error adding or updating prizes:', error);
      throw error;
    }
  };
  
  
  export {getTodaysProfit,configurePrizes,addOrUpdatePrizes}