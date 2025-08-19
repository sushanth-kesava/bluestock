import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
          const allLabels = Object.keys(timeSeries).reverse();
          // Sample every 5th point for a cleaner x-axis
          const step = 5;
          const labels = allLabels.filter((_, idx) => idx % step === 0);
          const prices = labels.map((time) =>
            parseFloat(timeSeries[time]["4. close"])
          );
          setChartData({
            labels,
            datasets: [
              {
                type: "line",
                label: `${symbol} Price`,
                data: prices,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.9, // Increase tension for smoother curve
                cubicInterpolationMode: "monotone", // Smoother interpolation
                yAxisID: 'y',
              },
            ],
          });
        } else {
          setError(
            "Failed to fetch data. API limit reached or invalid response."
          );
        }
      } catch {
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
        options={{
          responsive: true,
          plugins: { legend: { display: true } },
          elements: {
            line: {
              tension: 0.5, // Smoother curve
              cubicInterpolationMode: "monotone",
            },
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: { display: true, text: 'Price' },
              grid: { drawOnChartArea: true },
            },
          },
        }}
      />
    </div>
  );
};

export default LiveStockChart;
