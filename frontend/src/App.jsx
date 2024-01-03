// WeatherApp.js

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [citiesInput, setCitiesInput] = useState("");
  const [weatherResult, setWeatherResult] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Split citiesInput into an array and trim each city
    const cities = citiesInput.split(",").map((city) => city.trim());
    console.log(cities);

    try {
      // Make a POST request to the backend
      const response = await axios.post("/getWeather", { cities });

      // Update the state with the received weather data
      setWeatherResult(response.data.weather);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-blue-300 p-10 rounded-lg">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col font-bold gap-3"
        >
          <label htmlFor="cities">Enter cities (comma-separated): </label>
          <input
            type="text"
            id="cities"
            value={citiesInput}
            onChange={(e) => setCitiesInput(e.target.value)}
            required
            placeholder="London, Paris, Tokyo"
            className="p-2 rounded-lg"
          />
          <button type="submit" className="p-2 bg-green-400 rounded-lg">
            Get Weather
          </button>
        </form>

        <div>
          <h3>Weather Information:</h3>
          {weatherResult && (
            <ul>
              {Object.entries(weatherResult).map(([city, weather]) => (
                <li key={city}>{`${city}: ${weather}`}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
