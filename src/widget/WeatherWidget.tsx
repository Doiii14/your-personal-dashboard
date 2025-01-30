import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Wind, Cloud, Thermometer, Droplet } from "lucide-react"; // Importa le icone

interface WeatherWidgetProps {
  city: string; // La città viene passata come prop
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (city: string) => {
    if (!city) return; // Se la città non è ancora stata fornita, non fare la richiesta

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      setError("API Key is missing");
      return;
    }

    try {
      setLoading(true); // Inizia il caricamento
      const currentWeatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
      );
      
      const forecastWeatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes`
      );

      // Uniamo i dati correnti con le previsioni
      const data = {
        current: currentWeatherResponse.data.current,
        forecast: forecastWeatherResponse.data.forecast.forecastday[0],
        location: currentWeatherResponse.data.location, // Aggiungiamo la location qui
      };

      setWeatherData(data);
      setLoading(false); // Termina il caricamento
    } catch (error) {
      setError("Failed to fetch weather data");
      setLoading(false); // Termina il caricamento anche in caso di errore
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city); // Ricarica i dati solo se la città è definita
    }
  }, [city]);

  if (!city) {
    return <div>Please enter a city to view the weather.</div>; // Messaggio se non c'è una città
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData || !weatherData.location) {
    return <div>No weather data available</div>; // Controlla che weatherData e location siano definiti
  }

  const { temp_c, temp_f, air_quality, condition } = weatherData.current;
  const { name, region, country } = weatherData.location; // Ora siamo sicuri che weatherData.location esista
  const { mintemp_c, maxtemp_c } = weatherData.forecast.day; // Min/Max temperature from forecast
  const airQuality = air_quality ? air_quality["us-epa-index"] : "N/A";

  // Mappa per la qualità dell'aria
  const airQualityDescription: Record<number, string> = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for sensitive groups",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
  };

  const airQualityText = airQualityDescription[airQuality] || "Data not available";

  return (
    <div className="weather-widget">
      <h3 className="text-3xl font-semibold mb-6 text-center">Weather in {name}, {region}, {country}</h3>

      <div className="weather-detail grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Temperature */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-blue-100 shadow-xl">
          <Sun className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Temperature:</strong> {temp_c}°C
          </div>
        </div>

        {/* Air Quality */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-green-100 shadow-xl">
          <Droplet className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Air Quality Index:</strong> {airQuality} ({airQualityText})
          </div>
        </div>

        {/* Condition */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-gray-100 shadow-xl">
          <Cloud className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Condition:</strong> {condition.text}
          </div>
        </div>

        {/* Min Temperature */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-purple-100 shadow-xl">
          <Thermometer className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Min Temperature:</strong> {mintemp_c}°C
          </div>
        </div>

        {/* Max Temperature */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-red-100 shadow-xl">
          <Thermometer className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Max Temperature:</strong> {maxtemp_c}°C
          </div>
        </div>

        {/* Additional Condition (e.g., Wind, Humidity, etc.) */}
        <div className="p-6 border rounded-lg flex items-center justify-between bg-yellow-100 shadow-xl">
          <Wind className="w-12 h-12 mr-4" />
          <div>
            <strong className="text-xl">Wind:</strong> {weatherData.current.wind_kph} km/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
