import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ForecastChart({ forecast }) {
  // Prepare chart data
  const chartData = forecast.map(item => ({
    time: item.dt_txt.slice(5, 16), // "MM-DD HH:MM"
    temp: item.main.temp
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mt-6 w-full max-w-3xl">
      <h3 className="text-lg font-bold mb-4 text-center">5-Day / 3-Hour Temperature Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="#3b82f6" 
            strokeDasharray="5 5" // dotted line
            strokeWidth={2} 
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
