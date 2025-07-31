import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import WeatherCard from "./WeatherCard.jsx";
import ForecastChart from "./ForecastChart.jsx"
import axios from "axios";

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([])

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

    const fetchWeather = async (city) => {
        try {
            const currentWeatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(currentWeatherRes.data);

            const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            setForecast(forecastRes.data.list); // save the forecast list
        } catch (err) {
            alert("City not found!");
            setWeather(null);
            setForecast([]);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-3xl font-bold mb-6">🌤 Weather Info App</h1>
        <SearchBar onSearch={fetchWeather} />
        {weather && <WeatherCard data={weather} />}
        {forecast.length > 0 && <ForecastChart forecast={forecast} />}

        </div>
    );
}
