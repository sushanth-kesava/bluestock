import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_KEY = "demo"; // Replace with your Alpha Vantage API key for production

const LiveStockChart = ({ symbol = "MSFT" }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data["Time Series (5min)"]) {
          const timeSeries = data["Time Series (5min)"];
          const labels = Object.keys(timeSeries).reverse();
          const prices = labels.map((time) =>
            parseFloat(timeSeries[time]["4. close"])
          );
          setChartData({
            labels,
            datasets: [
              {
                label: `${symbol} Price`,
                data: prices,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.1,
              },
            ],
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
    const interval = setInterval(fetchData, 5000000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div>Loading live chart for {symbol}...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h3>Live {symbol} Stock Price (5min)</h3>
      <Line
        data={chartData}
        options={{ responsive: true, plugins: { legend: { display: true } } }}
      />
    </div>
  );
};

export default LiveStockChart;
