import React, { useCallback, useEffect, useState } from "react";
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

const DEFAULT_ALPHA_VANTAGE_API_KEY = "6UL8CT46Z4F9GHBW"; // Prefer using VITE_ALPHA_VANTAGE_API_KEY in .env

const LiveStockChart = ({ symbol = "MSFT", timeSeries }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildChartData = useCallback(
    (series) => {
    const allLabels = Object.keys(series).reverse();
    const step = 5;
    const labels = allLabels.filter((_, idx) => idx % step === 0);
    const prices = labels.map((time) => parseFloat(series[time]["4. close"]));
    return {
      labels,
      datasets: [
        {
          type: "line",
          label: `${symbol} Price`,
          data: prices,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.9,
          cubicInterpolationMode: "monotone",
          yAxisID: "y",
        },
      ],
    };
    },
    [symbol]
  );

  useEffect(() => {
    if (timeSeries) {
      setLoading(false);
      setError(null);
      setChartData(buildChartData(timeSeries));
      return;
    }

    const fetchData = async () => {
      const apiKey =
        import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || DEFAULT_ALPHA_VANTAGE_API_KEY;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data["Time Series (5min)"]) {
          setChartData(buildChartData(data["Time Series (5min)"]));
        } else {
          const apiMessage =
            data?.Note || data?.Information || data?.["Error Message"];
          setError(
            apiMessage ||
              "Failed to fetch data. API limit reached or invalid response."
          );
        }
      } catch {
        setError("Error fetching data.");
      }
      setLoading(false);
    };
    fetchData();
  }, [symbol, timeSeries, buildChartData]);

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
