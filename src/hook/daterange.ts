// utils/getTodayRange.ts

/**
 * Get the start and end range for today.
 * 
 * Returns:
 * - todayStart: Date object representing midnight of today's date
 * - todayEnd: Date object representing midnight of the next day
 */
export function getTodayRange(): { todayStart: Date; todayEnd: Date } {
    // Get today's date at midnight (start of the day)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
  
    // Get tomorrow's date at midnight (start of the next day)
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
  
    return { todayStart, todayEnd };
  }
  