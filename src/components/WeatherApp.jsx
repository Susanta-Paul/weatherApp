import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import WeatherCard from "./WeatherCard.jsx";
import ForecastChart from "./ForecastChart.jsx";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

  // Map weather types to background images
  const weatherBackgrounds = {
    Clear: "https://www.shutterstock.com/image-photo/beautiful-blue-summer-sky-fluffy-600nw-1938769708.jpg",
    Clouds: "https://t4.ftcdn.net/jpg/05/13/26/73/360_F_513267391_QEmNGeOFLLqrILTnoq21dReUPp5UsoNr.jpg",
    Rain: "https://images.twnmm.com/c55i45ef3o2a/4jlD0CtuVr1MeHfvbJ5jh/159825b4133c890fb1d775e549144b08/Rain_Puddles.jpg?fm=webp&q=80&w=3840",
    Snow: "https://nychazardmitigation.com/wp-content/uploads/2024/07/20170314_Snowy_Street_2-edited.jpg",
    Thunderstorm: "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/thunder--lightning/lightning-strike-over-a-town.jpeg",
  };

  const fetchWeather = async (city) => {
    try {
      const currentWeatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(currentWeatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastRes.data.list);
    } catch (err) {
      alert("City not found!");
      setWeather(null);
      setForecast([]);
    }
  };

  // Get background based on weather main type
  const weatherType = weather?.weather?.[0]?.main;
  const backgroundImage =
    weatherBackgrounds[weatherType] || "/images/default.jpg";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl md:text-5xl font-extrabold mb-8 tracking-wide drop-shadow-lg text-center"
        >
          🌤 Weather Info App
        </motion.h1>

        {/* Search Bar Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <SearchBar onSearch={fetchWeather} />
        </motion.div>

        {/* Weather & Forecast Section */}
        <div className="flex w-screen justify-around">
          {/* Weather Card Animation */}
          <AnimatePresence>
            {weather && (
              <motion.div
                key="weather-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="w-[30%]"
              >
                <WeatherCard data={weather} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forecast Chart Animation */}
          <AnimatePresence>
            {forecast.length > 0 && (
              <motion.div
                key="forecast-chart"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-[60%]"
              >
                <ForecastChart forecast={forecast} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
