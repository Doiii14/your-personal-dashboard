import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Sun, Wind, Cloud, Thermometer, Droplet } from "lucide-react";

const WeatherWidget: React.FC = () => {
  const { weatherData, status, error } = useSelector((state: RootState) => state.weather);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;
  if (!weatherData) return <div>No weather data available</div>;

  const { temp_c, air_quality, condition } = weatherData.current;
  const { name, region, country } = weatherData.location;

  return (
    <div className="weather-widget">
      <h3 className="text-3xl font-semibold mb-6 text-center">Weather in {name}, {region}, {country}</h3>
      <div className="weather-detail grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg flex items-center justify-between bg-blue-100 shadow-xl">
          <Sun className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Temperature:</strong> {temp_c}°C
          </div>
        </div>
        <div className="p-6 border rounded-lg flex items-center justify-between bg-gray-100 shadow-xl">
          <Cloud className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Condition:</strong> {condition.text}
          </div>
        </div>
        <div className="p-6 border rounded-lg flex items-center justify-between bg-green-100 shadow-xl">
          <Droplet className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Air Quality Index:</strong> {air_quality?.["us-epa-index"] || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
