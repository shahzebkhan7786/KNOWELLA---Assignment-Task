const express = require("express");
const serverless = require("serverless-http");
const path = require("path");

const { processCSV } = require("../src/csv/processor");
const { optimizeRoute } = require("../src/delivery/route");
const { getWeather } = require("../src/weather/weather");
const { checkAlert } = require("../src/weather/alert");
const config = require("../src/config.json");

const app = express();
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.send("Knovella API running 🚀");
});

/* CSV API */
app.get("/api/csv", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "sample.csv");
    const data = await processCSV(filePath, config);
    res.json(data);
  } catch (err) {
    console.error("CSV ERROR:", err);
    res.status(500).json({ error: "CSV processing failed" });
  }
});

/* DELIVERY API */
app.post("/api/delivery", (req, res) => {
  try {
    const route = optimizeRoute(req.body.points || []);
    res.json(route);
  } catch (err) {
    console.error("DELIVERY ERROR:", err);
    res.status(500).json({ error: "Delivery failed" });
  }
});

/* WEATHER API */
app.get("/api/weather", async (req, res) => {
  try {
    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ error: "Missing WEATHER_API_KEY" });
    }

    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon required" });
    }

    const weather = await getWeather(lat, lon);
    const alert = checkAlert(weather);

    res.json(alert);
  } catch (err) {
    console.error("WEATHER ERROR:", err);
    res.status(500).json({ error: "Weather failed" });
  }
});

/* EXPORT FOR VERCEL */
module.exports = serverless(app);
