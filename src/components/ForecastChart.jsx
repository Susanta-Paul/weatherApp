import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

export default function ForecastChart({ forecast }) {
  // Prepare chart data
  const chartData = forecast.map((item) => ({
    time: item.dt_txt.slice(5, 16), // "MM-DD HH:MM"
    temp: item.main.temp,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-6 mt-6 w-full max-w-2xl"
    >
      <h3 className="text-xl font-extrabold text-white text-center drop-shadow-md mb-6">
        📊 5-Day / 3-Hour Temperature Forecast
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="time" stroke="white" tick={{ fill: "white", fontSize: 12 }} />
          <YAxis unit="°C" stroke="white" tick={{ fill: "white", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "0.85rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#38bdf8" // Sky blue
            strokeWidth={3}
            dot={{ r: 5, fill: "#fff", stroke: "#38bdf8", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#38bdf8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
