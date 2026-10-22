const express = require("express");
const https = require("https");
const path = require("path");
const { URL } = require("url");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const cityName = typeof req.body.cityName === "string" ? req.body.cityName.trim() : "";
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!cityName) {
    return showError(400, "Enter a city name.");
  }

  if (!apiKey) {
    return showError(500, "Add OPENWEATHER_API_KEY to your .env file.");
  }

  const apiUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
  apiUrl.searchParams.set("q", cityName);
  apiUrl.searchParams.set("appid", apiKey);
  apiUrl.searchParams.set("units", "metric");

  const request = https.get(apiUrl, (response) => {
    let responseData = "";

    response.setEncoding("utf8");
    response.on("data", (chunk) => {
      responseData += chunk;
    });
    response.on("error", () => {
      showError(502, "The weather service response could not be read.");
    });
    response.on("end", () => {
      if (res.headersSent) {
        return;
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        if (response.statusCode === 404) {
          return showError(404, "That city was not found.");
        }

        if (response.statusCode === 401) {
          return showError(502, "The weather service rejected the API key. Check your .env file.");
        }

        return showError(502, "The weather service returned an error. Please try again later.");
      }

      try {
        const data = JSON.parse(responseData);
        const weather = data.weather && data.weather[0];

        if (!data.main || typeof data.main.temp !== "number" || !weather || !weather.description || !weather.icon) {
          return showError(502, "The weather service returned incomplete data.");
        }

        res.render("weather", {
          cityName,
          weather: { temperature: data.main.temp, description: weather.description, icon: weather.icon },
          error: ""
        });
      } catch (error) {
        showError(502, "The weather service returned invalid data.");
      }
    });
  });

  request.setTimeout(10000, () => request.destroy());
  request.on("error", () => {
    showError(502, "Could not reach the weather service. Please try again later.");
  });

  function showError(statusCode, error) {
    if (!res.headersSent) {
      res.status(statusCode).render("weather", { cityName, weather: null, error });
    }
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
  });
}

module.exports = { app };
