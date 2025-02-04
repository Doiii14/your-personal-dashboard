import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity, fetchWeather } from "../redux/weatherSlice";
import { RootState, AppDispatch } from "../redux/store";
import WeatherWidget from "../widget/WeatherWidget";

const Weather: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.weather.city);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCity(search));
    dispatch(fetchWeather(search)); // Chiamiamo l'API solo una volta
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Weather Information</h1>
        <p className="text-lg text-gray-600">Here you can check the latest weather updates for your city.</p>
      </div>

      <div className="search-bar mb-8 text-center">
        <form onSubmit={handleSearchSubmit} className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter city"
            value={search}
            onChange={handleSearchChange}
            className="p-3 rounded-lg border border-gray-300 shadow-lg w-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg ml-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>

      {city && <WeatherWidget />}
      {!city && (
        <div className="text-center mt-4 text-gray-500">
          Please enter a city to see the weather.
        </div>
      )}
    </div>
  );
};

export default Weather;
