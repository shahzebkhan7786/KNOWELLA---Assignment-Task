const axios = require("axios");

exports.getWeather = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  return res.data;
};
