import React from "react";
import LiveStockChart from "./LiveStockChart";

const LeftPanel = ({ stockData }) => {
  if (!stockData)
    return <div className="left-panel">Loading stock data...</div>;

  return (
    <div className="left-panel">
      <div className="stock-header">
        <h2>
          {stockData.symbol} <span>Microsoft Corp NASDAQ</span>
        </h2>
        <h1>
          ${stockData.price} <span className="green">Live</span>
        </h1>
        <p>Last update: {stockData.lastUpdate}</p>
      </div>
      <div className="stock-details">
        <p>Open: {stockData.open}</p>
        <p>High: {stockData.high}</p>
        <p>Low: {stockData.low}</p>
        <p>Close: {stockData.close}</p>
        <p>Volume: {stockData.volume}</p>
      </div>
      <LiveStockChart symbol={stockData.symbol} />
    </div>
  );
};

export default LeftPanel;
