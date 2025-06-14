import React from "react";
import "../Styles/Dashboard.css";
const RightPanel = ({
  quantity,
  setQuantity,
  stopPrice,
  setStopPrice,
  transactionFee,
  estimatedTotal,
  stockData,
}) => {
  return (
    <div className="right-panel">
      <h3>Trade</h3>
      <label>Order Type</label>
      <select>
        <option>Market Price</option>
      </select>
      <label>Quantity (Shares)</label>
      <input
        type="number"
        value={quantity === 0 ? "" : quantity}
        onChange={(e) => {
          const val = e.target.value;
          setQuantity(val === "" ? 0 : Number(val));
        }}
        min="0"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <label>Time-in-Force</label>
      <select>
        <option>Day</option>
      </select>
      <div className="toggle">
        <input type="checkbox" />
        <label>Stop Price</label>
      </div>
      <input
        type="number"
        value={stopPrice === 0 ? "" : stopPrice}
        onChange={(e) => {
          const val = e.target.value;
          setStopPrice(val === "" ? 0 : Number(val));
        }}
        min="0"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      {stockData && (
        <div className="live-stock-info">
          <p>
            Live Price:{" "}
            <span className="green">
              ${parseFloat(stockData.price).toFixed(2)}
            </span>
          </p>
          <p>
            Open:{" "}
            <span className="green">
              ${parseFloat(stockData.open).toFixed(2)}
            </span>
          </p>
          <p>
            High:{" "}
            <span className="green">
              ${parseFloat(stockData.high).toFixed(2)}
            </span>
          </p>
          <p>
            Low:{" "}
            <span className="green">
              ${parseFloat(stockData.low).toFixed(2)}
            </span>
          </p>
          <p>
            Close:{" "}
            <span className="green">
              ${parseFloat(stockData.close).toFixed(2)}
            </span>
          </p>
          <p>
            Volume:{" "}
            <span className="green">
              {parseFloat(stockData.volume).toFixed(2)}
            </span>
          </p>
        </div>
      )}
      <p className="loss-warning">
        Est. Loss: <span className="red">$12,057.36</span>
      </p>
      <div className="funds-info">
        <p>Buying Power: $122,912.50</p>
        <p>Transaction Fees: ${transactionFee.toFixed(2)}</p>
        <p>Estimated Total: ${estimatedTotal}</p>
      </div>
      <button className="buy-button">Buy MSFT</button>
      <p className="disclaimer">Disclaimer</p>
    </div>
  );
};

export default RightPanel;
