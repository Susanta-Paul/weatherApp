import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API; // for Vite projects

  // Fetch city suggestions when typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error("Error fetching city suggestions", error);
      }
    };

    // Debounce so API is not called too often
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query, API_KEY]);

  // Handle city selection
  const handleSelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    onSearch(city.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white w-full mt-1 rounded-lg shadow-lg z-10">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {city.name}
              {city.state ? `, ${city.state}` : ""} ({city.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
