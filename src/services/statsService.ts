
// Stats service for tracking game results over time
import { toast } from "../hooks/use-toast";

export interface GameResult {
  timestamp: number;
  bet: number;
  win: number;
  isWin: boolean;
}

interface StatsData {
  results: GameResult[];
  totalBets: number;
  totalWins: number;
  totalSpins: number;
}

// Local storage key for stats data
const STATS_STORAGE_KEY = 'pirate_slots_stats';

// Initialize stats data from local storage or create new
const initializeStats = (): StatsData => {
  try {
    const storedData = localStorage.getItem(STATS_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error loading stats data:', error);
  }
  
  // Return default empty stats if nothing found or error
  return {
    results: [],
    totalBets: 0,
    totalWins: 0,
    totalSpins: 0
  };
};

// Save stats data to local storage
const saveStats = (stats: StatsData): void => {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats data:', error);
    toast({
      title: "Error Saving Stats",
      description: "Could not save your game statistics.",
      variant: "destructive"
    });
  }
};

// Get all game statistics
export const getStats = (): StatsData => {
  return initializeStats();
};

// Record a new game result
export const recordGameResult = (bet: number, win: number): void => {
  const stats = initializeStats();
  
  const newResult: GameResult = {
    timestamp: Date.now(),
    bet,
    win,
    isWin: win > 0
  };
  
  // Update stats
  stats.results.push(newResult);
  stats.totalBets += bet;
  stats.totalWins += win;
  stats.totalSpins += 1;
  
  // Save updated stats
  saveStats(stats);
};

// Clear all stored stats
export const clearStats = (): void => {
  const emptyStats: StatsData = {
    results: [],
    totalBets: 0,
    totalWins: 0,
    totalSpins: 0
  };
  
  saveStats(emptyStats);
  
  toast({
    title: "Stats Cleared",
    description: "All game statistics have been reset.",
  });
};

// Get data formatted for charts - last 7 days
export const getChartData = () => {
  const stats = initializeStats();
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  // Get results from last 7 days
  const recentResults = stats.results.filter(result => 
    (now - result.timestamp) < (7 * oneDay)
  );
  
  // Group by day
  const resultsByDay: Record<string, { wins: number, losses: number, bets: number, returns: number }> = {};
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now - (i * oneDay));
    const dateStr = date.toLocaleDateString();
    resultsByDay[dateStr] = { wins: 0, losses: 0, bets: 0, returns: 0 };
  }
  
  // Fill in actual results
  recentResults.forEach(result => {
    const date = new Date(result.timestamp);
    const dateStr = date.toLocaleDateString();
    
    if (!resultsByDay[dateStr]) {
      resultsByDay[dateStr] = { wins: 0, losses: 0, bets: 0, returns: 0 };
    }
    
    if (result.isWin) {
      resultsByDay[dateStr].wins += 1;
      resultsByDay[dateStr].returns += result.win;
    } else {
      resultsByDay[dateStr].losses += 1;
    }
    
    resultsByDay[dateStr].bets += result.bet;
  });
  
  // Convert to array for charts
  const chartData = Object.entries(resultsByDay).map(([date, data]) => ({
    date,
    wins: data.wins,
    losses: data.losses,
    bets: data.bets,
    returns: data.returns,
    profit: data.returns - data.bets
  }));
  
  return chartData;
};

