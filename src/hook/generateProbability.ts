interface PrizeConfig {
    value: number;
    probability: number;
  }
  
 export  const generateProbability = (prizesConfig: PrizeConfig[]): PrizeConfig[] => {
    // Step 1: Calculate the total probability sum for weighted selection
   // const totalProbability = prizesConfig.reduce((sum, prize) => sum + prize.probability, 0);
  
    // Step 2: Use random weighted selection to choose a prize
    const weightedPrizes = prizesConfig.map(prize => prize.probability);
    const randomIndex = getRandomIndex(weightedPrizes);
  
    // Step 3: Update the selected prize's probability to 100, others to 0
    return prizesConfig.map((prize, index) => {
      if (index === randomIndex) {
        return { ...prize, probability: 100 };
      } else {
        return { ...prize, probability: 0 };
      }
    });
  };
  
  // Helper function to perform weighted random selection
  const getRandomIndex = (weights: number[]): number => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue <= cumulativeWeight) {
        return i;
      }
    }
  
    return weights.length - 1; // Default to the last index if no match (shouldn't happen)
  };
  
//   // Example usage:
//   const prizes_config: PrizeConfig[] = [
//     { value: 1, probability: 50 },
//     { value: 3, probability: 30 },
//     { value: 7, probability: 20 },
//   ];
  
//   const updatedPrizes = configurePrizes(prizes_config);
//   console.log(updatedPrizes);
  