const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Mock weather data (replace this with a real weather API call)
const weatherData = {
  toronto: "24C",
  mumbai: "34C",
  london: "14C",
};

app.use(bodyParser.json());

app.post("/getWeather", (req, res) => {
  try {
    // Get the list of cities from the POST request body
    const { cities } = req.body;

    // Validate if 'cities' parameter is present
    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ error: "No cities provided" });
    }

    // Get weather information for each city
    const result = {};
    cities.forEach((city) => {
      // Check if the city is in the mock weather data
      const lowercaseCity = city.toLowerCase();
      result[city] = weatherData[lowercaseCity] || "City not found";
    });

    res.json({ weather: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
