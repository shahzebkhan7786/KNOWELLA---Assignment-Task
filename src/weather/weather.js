const axios = require("axios");

exports.getWeather = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API Key");
  }

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        appid: apiKey
      }
    }
  );

  return res.data;
};
