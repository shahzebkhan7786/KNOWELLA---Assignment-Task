const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* CSV (SAFE - NO FILE SYSTEM) */
app.get("/api/csv", async (req, res) => {
  try {
    const data = [
      { name: "JOHN", age: 28 },
      { name: "BOB", age: 35 }
    ];
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "CSV fallback response" });
  }
});

/* DELIVERY (SAFE) */
app.post("/api/delivery", (req, res) => {
  try {
    const points = req.body.points || [];

    if (!points.length) {
      return res.json({ message: "No points provided" });
    }

    // simple safe return
    res.json(points);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Delivery fallback" });
  }
});

/* WEATHER (SAFE - NO EXTERNAL API) */
app.get("/api/weather", (req, res) => {
  try {
    res.json({
      type: "INFO",
      message: "Weather service running (mock)"
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: "Weather fallback" });
  }
});

/* GLOBAL FALLBACK (VERY IMPORTANT) */
app.use((req, res) => {
  res.status(200).json({ message: "Fallback route hit" });
});

/* EXPORT */
module.exports = serverless(app);
