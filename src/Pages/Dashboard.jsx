import React, { useState, useEffect, useRef } from "react";
import "../Styles/Dashboard.css";
import HeaderBar from "../Components/HeaderBar";
import SideNav from "../Components/SideNav";
import LeftPanel from "../Components/LeftPanel";
import RightPanel from "../Components/RightPanel";
import Footer from "../Components/Footer";

const DEFAULT_ALPHA_VANTAGE_API_KEY = "J1RLXL8GHS753W5D"; // Prefer using VITE_ALPHA_VANTAGE_API_KEY in .env
const SYMBOL = "MSFT";
const INTERVAL = "5min";
const REFRESH_MS = 5 * 60 * 1000;

const buildStockDataFromIntraday = (symbol, timeSeries) => {
  const times = Object.keys(timeSeries).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const latest = timeSeries[times[0]];
  return {
    symbol,
    price: parseFloat(latest["4. close"]),
    open: parseFloat(latest["1. open"]),
    high: parseFloat(latest["2. high"]),
    low: parseFloat(latest["3. low"]),
    close: parseFloat(latest["4. close"]),
    volume: latest["5. volume"],
    lastUpdate: times[0],
    allTimes: times,
    allSeries: timeSeries,
  };
};

const buildTimeSeriesFromMarketstackEod = (marketstackData) => {
  // Normalize Marketstack EOD array into the AlphaVantage-like structure used by this UI.
  // Key: date string, Value: { '1. open', '2. high', '3. low', '4. close', '5. volume' }
  const timeSeries = {};
  for (const row of marketstackData || []) {
    if (!row?.date) continue;
    const key = String(row.date).replace("T", " ").replace("Z", "");
    timeSeries[key] = {
      "1. open": String(row.open ?? ""),
      "2. high": String(row.high ?? ""),
      "3. low": String(row.low ?? ""),
      "4. close": String(row.close ?? ""),
      "5. volume": String(row.volume ?? ""),
    };
  }
  return timeSeries;
};

const Dashboard = ({ onLogout }) => {
  const [quantity, setQuantity] = useState(100);
  const [stopPrice, setStopPrice] = useState(400);
  const [stockData, setStockData] = useState(null);
  const stockDataRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const transactionFee = 4.0;
  const estimatedTotal = stockData
    ? (stockData.price * quantity + transactionFee).toFixed(2)
    : 0;

  useEffect(() => {
    stockDataRef.current = stockData;
  }, [stockData]);

  useEffect(() => {
    const marketstackKey = import.meta.env.VITE_MARKETSTACK_API_KEY;
    const alphaVantageKey =
      import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || DEFAULT_ALPHA_VANTAGE_API_KEY;
    const cacheKey = `dashboard:stockData:${SYMBOL}`;

    const loadCached = () => {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.stockData || null;
      } catch {
        return null;
      }
    };

    const saveCached = (nextStockData) => {
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ stockData: nextStockData, cachedAt: Date.now() })
        );
      } catch {
        // Ignore cache write failures
      }
    };

    const loadMock = async () => {
      const response = await fetch("/mock/alphavantage-intraday-MSFT-5min.json");
      const data = await response.json();
      const series = data?.[`Time Series (${INTERVAL})`];
      if (!series) {
        throw new Error("Mock data missing time series.");
      }
      return buildStockDataFromIntraday(SYMBOL, series);
    };

    const isAlphaVantageRateLimitMessage = (message) =>
      typeof message === "string" &&
      (message.includes("Thank you for using Alpha Vantage") ||
        message.toLowerCase().includes("rate limit"));

    const isMarketstackRateLimitMessage = (message) =>
      typeof message === "string" &&
      (message.toLowerCase().includes("rate limit") ||
        message.toLowerCase().includes("too many requests"));

    const fetchFromMarketstack = async () => {
      if (!marketstackKey) {
        throw new Error(
          "Missing Marketstack API key. Set VITE_MARKETSTACK_API_KEY in .env.local."
        );
      }

      // Use Vite dev proxy (/marketstack -> https://api.marketstack.com/v1)
      const response = await fetch(
        `/marketstack/eod?access_key=${encodeURIComponent(
          marketstackKey
        )}&symbols=${encodeURIComponent(SYMBOL)}&limit=100`
      );
      const data = await response.json();

      if (data?.error?.message) {
        throw new Error(data.error.message);
      }
      if (!Array.isArray(data?.data) || data.data.length === 0) {
        throw new Error("Marketstack returned no data.");
      }

      const series = buildTimeSeriesFromMarketstackEod(data.data);
      const hasAnyPoint = Object.keys(series).length > 0;
      if (!hasAnyPoint) {
        throw new Error("Marketstack returned unusable data.");
      }
      return buildStockDataFromIntraday(SYMBOL, series);
    };

    const fetchFromAlphaVantage = async () => {
      if (!alphaVantageKey) {
        throw new Error(
          "Missing API key. Set VITE_ALPHA_VANTAGE_API_KEY in a .env file."
        );
      }
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=${INTERVAL}&apikey=${alphaVantageKey}`
      );
      const data = await response.json();
      const timeSeries = data[`Time Series (${INTERVAL})`];

      if (timeSeries) {
        return buildStockDataFromIntraday(SYMBOL, timeSeries);
      }

      const apiMessage = data?.Note || data?.Information || data?.["Error Message"];
      throw new Error(
        apiMessage || "Failed to fetch data. API limit reached or invalid response."
      );
    };

    const fetchData = async () => {
      const isInitialLoad = !stockDataRef.current;
      if (isInitialLoad) setLoading(true);
      try {
        // Prefer Marketstack if configured; otherwise use AlphaVantage.
        const nextStockData = marketstackKey
          ? await fetchFromMarketstack()
          : await fetchFromAlphaVantage();

        setStockData(nextStockData);
        saveCached(nextStockData);
        setError(null);
        return;
      } catch (err) {
        const rawMessage =
          err instanceof Error ? err.message : "Error fetching data.";
        const friendlyMessage =
          isAlphaVantageRateLimitMessage(rawMessage) ||
          isMarketstackRateLimitMessage(rawMessage)
            ? "API rate limit reached. Showing cached/mock data."
            : rawMessage;
        setError(friendlyMessage);
        // If we have cached data, keep rendering it instead of blanking the dashboard.
        if (!stockDataRef.current) {
          const cached = loadCached();
          if (cached) {
            setStockData(cached);
          } else {
            try {
              const mock = await loadMock();
              setStockData(mock);
            } catch {
              // No cached data and mock failed; keep showing error.
            }
          }
        }
      }
      setLoading(false);
    };

    const cached = loadCached();
    if (cached) {
      setStockData(cached);
      setLoading(false);
    }
    fetchData();
    const interval = setInterval(fetchData, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeaderBar />
      <SideNav onLogout={onLogout} />
      <div className="dashboard">
        {loading && !stockData && (
          <div className="dashboard-status">Loading stock data...</div>
        )}
        {error && <div className="dashboard-status">{error}</div>}
        {stockData && (
          <>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
