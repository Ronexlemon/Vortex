export function getFormattedDate(): string {
    const today = new Date();
  
    // Extract day, month, and year
    const day = today.getDate().toString().padStart(2, "0"); // Ensures 2 digits
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
  
    // Format as "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
  }
  
//   // Example usage
//   const todayFormatted = getFormattedDate();
//   console.log("Today's Date:", todayFormatted); // Output: "19/11/2024" if today is Nov 19, 2024
  