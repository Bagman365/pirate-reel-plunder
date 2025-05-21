
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Legend, Tooltip } from 'recharts';
import { useWallet } from '../providers/WalletProvider';
import { getStats, getChartData, clearStats } from '../services/statsService';
import PirateAnimatedBackground from '../components/slot-machine/PirateAnimatedBackground';

const chartConfig = {
  wins: {
    label: "Wins",
    color: "#10b981", // Green
  },
  losses: {
    label: "Losses",
    color: "#ef4444", // Red
  },
  bets: {
    label: "Bets",
    color: "#6366f1", // Indigo
  },
  returns: {
    label: "Returns",
    color: "#f59e0b", // Amber
  },
  profit: {
    label: "Profit",
    color: "#3b82f6", // Blue
  }
};

const Stats = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBets: 0,
    totalWins: 0,
    totalSpins: 0,
    winRate: "0%",
    netProfit: 0
  });
  const { balance } = useWallet();

  // Load stats data
  const loadStats = () => {
    // Get chart data
    const data = getChartData();
    setChartData(data);
    
    // Get overall stats
    const allStats = getStats();
    const winCount = allStats.results.filter(r => r.isWin).length;
    const winRate = allStats.totalSpins > 0 
      ? ((winCount / allStats.totalSpins) * 100).toFixed(1) 
      : "0";
      
    setStats({
      totalBets: allStats.totalBets,
      totalWins: allStats.totalWins,
      totalSpins: allStats.totalSpins,
      winRate: `${winRate}%`,
      netProfit: allStats.totalWins - allStats.totalBets
    });
  };

  // Load stats on initial render
  useEffect(() => {
    loadStats();
  }, []);

  // Handle clearing stats
  const handleClearStats = () => {
    clearStats();
    loadStats();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pirate-navy to-pirate-navy/90 text-white relative">
      {/* Background pirate image */}
      <PirateAnimatedBackground image="/lovable-uploads/bfa292e1-ee29-4960-a2cf-f818d1a83ed5.png" />
      
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-pirate-navy to-pirate-navy/90 bg-opacity-60 z-5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-pirate-sea opacity-30 animate-sail z-0"></div>
      
      <div className="container relative z-20 max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-pirata text-pirate-gold">Pirate Stats</h1>
            <Button variant="outline" asChild className="text-pirate-gold border-pirate-gold hover:bg-pirate-gold/20">
              <Link to="/">Back to Game</Link>
            </Button>
          </div>
          <div className="bg-pirate-darkwood/80 p-4 rounded-lg flex justify-between items-center">
            <p className="font-pirata text-xl text-pirate-gold">Current Balance: {balance} VOI</p>
            <Button 
              variant="destructive" 
              onClick={handleClearStats}
              className="bg-pirate-darkwood hover:bg-pirate-darkwood/80 text-pirate-gold"
            >
              Reset Stats
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-pirate-gold">Spins</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalSpins}</p>
              <p className="text-sm text-gray-300">Total games played</p>
            </CardContent>
          </Card>
          <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-pirate-gold">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.winRate}</p>
              <p className="text-sm text-gray-300">Winning spins percentage</p>
            </CardContent>
          </Card>
          <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-pirate-gold">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${stats.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.netProfit.toFixed(2)} VOI
              </p>
              <p className="text-sm text-gray-300">Total winnings minus bets</p>
            </CardContent>
          </Card>
        </div>

        {/* Win/Loss Chart */}
        <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50 mb-8">
          <CardHeader>
            <CardTitle className="text-pirate-gold">7-Day Win/Loss History</CardTitle>
            <CardDescription className="text-gray-300">Summary of your recent gaming performance</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-400">No game data available yet. Play some games first!</p>
              </div>
            ) : (
              <ChartContainer className="h-64" config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" tick={{ fill: '#ddd' }} />
                  <YAxis tick={{ fill: '#ddd' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="wins" fill={chartConfig.wins.color} name="Wins" />
                  <Bar dataKey="losses" fill={chartConfig.losses.color} name="Losses" />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Profit Chart */}
        <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50 mb-8">
          <CardHeader>
            <CardTitle className="text-pirate-gold">7-Day Profit/Loss</CardTitle>
            <CardDescription className="text-gray-300">Daily profit or loss (winnings - bets)</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-400">No game data available yet. Play some games first!</p>
              </div>
            ) : (
              <ChartContainer className="h-64" config={chartConfig}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" tick={{ fill: '#ddd' }} />
                  <YAxis tick={{ fill: '#ddd' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke={chartConfig.profit.color} 
                    strokeWidth={2}
                    dot={{ fill: chartConfig.profit.color }}
                    name="Profit/Loss"
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Financial Summary Table */}
        <Card className="bg-pirate-darkwood/60 text-white border-pirate-gold/50">
          <CardHeader>
            <CardTitle className="text-pirate-gold">Financial Summary</CardTitle>
            <CardDescription className="text-gray-300">Overall gambling statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-pirate-gold/30 hover:bg-pirate-darkwood/80">
                  <TableHead className="text-pirate-gold">Category</TableHead>
                  <TableHead className="text-right text-pirate-gold">Amount (VOI)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-pirate-gold/30 hover:bg-pirate-darkwood/80">
                  <TableCell>Total Bets</TableCell>
                  <TableCell className="text-right">{stats.totalBets.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow className="border-pirate-gold/30 hover:bg-pirate-darkwood/80">
                  <TableCell>Total Wins</TableCell>
                  <TableCell className="text-right">{stats.totalWins.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow className="border-pirate-gold/30 hover:bg-pirate-darkwood/80 font-bold">
                  <TableCell>Net Profit</TableCell>
                  <TableCell className={`text-right ${stats.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.netProfit.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">
            Data is stored locally in your browser and will persist between visits.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
