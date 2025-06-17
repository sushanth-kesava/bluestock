import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import HeaderBar from "../Components/HeaderBar";
import SideNav from "../Components/SideNav";
import LeftPanel from "../Components/LeftPanel";
import RightPanel from "../Components/RightPanel";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "demo"; // Replace with your Alpha Vantage API key for production
const SYMBOL = "MSFT";

const Dashboard = ({ onLogout }) => {
  const [quantity, setQuantity] = useState(100);
  const [stopPrice, setStopPrice] = useState(400);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const transactionFee = 4.0;
  const estimatedTotal = stockData
    ? (stockData.price * quantity + transactionFee).toFixed(2)
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=5min&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data["Time Series (5min)"]) {
          const timeSeries = data["Time Series (5min)"];
          const times = Object.keys(timeSeries).sort(
            (a, b) => new Date(b) - new Date(a)
          );
          const latest = timeSeries[times[0]];
          setStockData({
            symbol: SYMBOL,
            price: parseFloat(latest["4. close"]),
            open: parseFloat(latest["1. open"]),
            high: parseFloat(latest["2. high"]),
            low: parseFloat(latest["3. low"]),
            close: parseFloat(latest["4. close"]),
            volume: latest["5. volume"],
            lastUpdate: times[0],
            allTimes: times,
            allSeries: timeSeries,
          });
        } else {
          setError(
            "Failed to fetch data. API limit reached or invalid response."
          );
        }
      } catch (err) {
        setError("Error fetching data.");
      }
      setLoading(false);
    };
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1 min
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="dashboard">
        <span className="loading-stock-icon-fa">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" color="#ff9800" />
        </span>
      </div>
    );
  if (error) return <div className="dashboard">{error}</div>;
  if (!stockData) return null;

  return (
    <>
      <HeaderBar />
      <SideNav onLogout={onLogout} />
      <div className="dashboard">
        <LeftPanel stockData={stockData} />
        <RightPanel
          quantity={quantity}
          setQuantity={setQuantity}
          stopPrice={stopPrice}
          setStopPrice={setStopPrice}
          transactionFee={transactionFee}
          estimatedTotal={estimatedTotal}
          stockData={stockData}
        />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
