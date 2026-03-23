exports.checkAlert = (weather) => {
  const condition = weather.weather[0].main;

  if (["Thunderstorm", "Rain", "Snow"].includes(condition)) {
    return {
      type: "CRITICAL",
      message: "Severe weather detected! Take precautions."
    };
  }

  return {
    type: "INFO",
    message: "Weather conditions are normal."
  };
};
