app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!process.env.WEATHER_API_KEY) {
      return res.json({
        type: "INFO",
        message: "Weather API key not configured"
      });
    }

    const weather = await getWeather(lat, lon);
    const alert = checkAlert(weather);

    res.json(alert);
  } catch (err) {
    console.error(err);

    res.json({
      type: "ERROR",
      message: "Weather service unavailable"
    });
  }
});
