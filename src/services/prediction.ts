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

  export {getTodaysProfit}