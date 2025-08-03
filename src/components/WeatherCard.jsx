import { motion } from "framer-motion";

export default function WeatherCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 mt-6 w-full max-w-sm text-center border border-white/30"
    >
      {/* City Name */}
      <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
        {data.name}
      </h2>

      {/* Weather Description */}
      <p className="text-gray-200 capitalize tracking-wide mt-1">
        {data.weather[0].description}
      </p>

      {/* Temperature + Icon */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <img
          alt="weather icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          className="w-20 h-20"
        />
        <span className="text-5xl font-bold text-white drop-shadow-lg">
          {Math.round(data.main.temp)}°C
        </span>
      </div>

      {/* Additional Info */}
      <div className="mt-4 flex justify-around text-gray-200">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{data.main.humidity}%</span>
          <span className="text-sm opacity-80">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{data.wind.speed} m/s</span>
          <span className="text-sm opacity-80">Wind</span>
        </div>
      </div>
    </motion.div>
  );
}
