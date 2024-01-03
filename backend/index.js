import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/getWeather", async (req, res) => {
  try {
    // Get the list of cities from the POST request body
    const { cities } = req.body;

    // Validate if 'cities' parameter is present
    if (!cities || !Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ error: "No cities provided" });
    }

    // Get weather information for each city
    const result = {};

    for (const city of cities) {
      const url = `https://api.weatherapi.com/v1/current.json?key=bc242e95349642568fc124118240301&q=${city}&aqi=no`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.error) {
        result[city] = "City not found";
      } else {
        result[city] = data.current.temp_c + "C";
      }
    }

    res.json({ weather: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
