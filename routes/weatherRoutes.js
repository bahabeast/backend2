const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY; 

router.get("/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      city: data.name,
      temperature: `${data.main.temp}°C`,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

module.exports = router;
