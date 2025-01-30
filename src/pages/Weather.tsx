import React, { useState } from "react";
import WeatherWidget from "../widget/WeatherWidget"; // Importa il WeatherWidget

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>(""); // Stato per la città
  const [search, setSearch] = useState<string>(""); // Stato per il testo della ricerca

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Aggiorna il testo della ricerca
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(search); // Passa il valore della ricerca alla città
  };

  return (
    <div className="p-6">
      {/* Titolo e descrizione centrati */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Weather Information</h1>
        <p className="text-lg text-gray-600">Here you can check the latest weather updates for your city.</p>
      </div>
      
      {/* Barra di ricerca per la città */}
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

      {/* Passa il valore della città al widget */}
      {city && <WeatherWidget city={city} />}
      
      {/* Se la città non è stata inserita, mostra un messaggio */}
      {!city && (
        <div className="text-center mt-4 text-gray-500">
          Please enter a city to see the weather.
        </div>
      )}
    </div>
  );
};

export default Weather;
