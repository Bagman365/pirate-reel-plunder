
interface CoinProps {
  id: number;
  left: string;
  animationDelay: string;
}

interface FallingCoinsProps {
  coins: CoinProps[];
}

const FallingCoins = ({ coins }: FallingCoinsProps) => {
  return (
    <>
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="coin animate-coin-fall"
          style={{
            left: coin.left,
            animationDelay: coin.animationDelay,
          }}
        />
      ))}
    </>
  );
};

export default FallingCoins;
