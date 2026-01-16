import { useEffect, useRef, useState } from "react";

const initialStocks = [
  { symbol: "AAPL", price: 178.5, name: "Apple Inc." },
  { symbol: "GOOGL", price: 142.3, name: "Alphabet Inc." },
  { symbol: "MSFT", price: 378.9, name: "Microsoft Corp." },
  { symbol: "AMZN", price: 145.2, name: "Amazon.com Inc." },
  { symbol: "TSLA", price: 242.8, name: "Tesla Inc." },
];

function StockTicker() {
  const [stocks, setStocks] = useState(initialStocks);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const getRandomChange = () => +(Math.random() * 1 - 0.5).toFixed(2);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = getRandomChange();
          const newPrice = +(stock.price + change).toFixed(2);
          const percentChange = +((change / stock.price) * 100).toFixed(2);

          return {
            ...stock,
            prevPrice: stock.price,
            price: newPrice,
            change,
            percentChange,
          };
        })
      );
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleUpdates = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2> Stock Price Ticker</h2>

      <button onClick={toggleUpdates}>
        {isRunning ? "Stop Updates" : "Start Updates"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {stocks.map((stock) => {
          const isUp = stock.price > (stock.prevPrice ?? stock.price);
          const color = isUp ? "green" : "red";

          return (
            <li
              key={stock.symbol}
              style={{
                margin: "12px 0",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <strong>{stock.symbol}</strong> – {stock.name}
              <div style={{ color }}>
                ${stock.price.toFixed(2)}{" "}
                {stock.change && (
                  <>
                    ({stock.change > 0 ? "+" : ""}
                    {stock.change.toFixed(2)} | {stock.percentChange}%)
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StockTicker;
