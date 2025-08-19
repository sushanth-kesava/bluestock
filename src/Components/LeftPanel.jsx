import React from "react";
import LiveStockChart from "./LiveStockChart";

const LeftPanel = ({ stockData }) => {
  if (!stockData)
    return <div className="left-panel">Loading stock data...</div>;

  return (
    <div className="left-panel">
      <div className="stock-header">
        <h2>
          {stockData.symbol} <span>{stockData.company || "NSE Stock"}</span>
        </h2>
        <h1>
          ₹{stockData.price?.toFixed(2)} <span className="green">Live</span>
        </h1>
        <p>Last update: {stockData.lastUpdate}</p>
      </div>
      <div className="stock-details">
        <p>Open: ₹{stockData.open?.toFixed(2)}</p>
        <p>High: ₹{stockData.high?.toFixed(2)}</p>
        <p>Low: ₹{stockData.low?.toFixed(2)}</p>
        <p>Close: ₹{stockData.close?.toFixed(2)}</p>
        <p>Volume: {stockData.volume?.toLocaleString()}</p>
      </div>
      <LiveStockChart symbol={stockData.symbol} />
    </div>
  );
};

export default LeftPanel;
