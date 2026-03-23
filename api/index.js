export default function handler(req, res) {
  try {
    const { url, method } = req;

    if (url === "/") {
      return res.status(200).send("API running 🚀");
    }

    if (url.startsWith("/api/csv")) {
      return res.status(200).json([
        { name: "JOHN", age: 28 },
        { name: "BOB", age: 35 }
      ]);
    }

    if (url.startsWith("/api/delivery") && method === "POST") {
      return res.status(200).json({
        message: "Delivery endpoint working"
      });
    }

    if (url.startsWith("/api/weather")) {
      return res.status(200).json({
        type: "INFO",
        message: "Weather API working"
      });
    }

    return res.status(200).json({ message: "Fallback route" });

  } catch (err) {
    console.error(err);
    return res.status(200).json({ error: "Safe fallback" });
  }
}
