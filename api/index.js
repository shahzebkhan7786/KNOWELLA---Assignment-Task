const express = require("express");
const serverless = require("serverless-http");

const { processCSV } = require("../src/csv/processor");
const { optimizeRoute } = require("../src/delivery/route");
const { getWeather } = require("../src/weather/weather");
const { checkAlert } = require("../src/weather/alert");
const config = require("../src/config.json");

const app = express();
app.use(express.json());

/* ---------------- CSV PROCESSOR ---------------- */
app.get("/api/csv", async (req, res) => {
  const data = await processCSV("sample.csv", config);
  res.json(data);
});

/* ---------------- DELIVERY OPTIMIZER ---------------- */
app.post("/api/delivery", (req, res) => {
  const route = optimizeRoute(req.body.points);
  res.json(route);
});

/* ---------------- WEATHER ALERT ---------------- */
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;

  const weather = await getWeather(lat, lon);
  const alert = checkAlert(weather);

  res.json(alert);
});

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("Knovella Assessment API Running 🚀");
});

module.exports = app;
module.exports.handler = serverless(app);
