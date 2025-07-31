
export default function WeatherCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p className="text-gray-600 capitalize">{data.weather[0].description}</p>
      <div className="flex justify-center items-center mt-4">
        <img
          alt="weather icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        />
        <span className="text-4xl font-bold">{Math.round(data.main.temp)}°C</span>
      </div>
      <p className="text-gray-500">Humidity: {data.main.humidity}%</p>
      <p className="text-gray-500">Wind: {data.wind.speed} m/s</p>
    </div>
  );
}
