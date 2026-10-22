# Run the weather app

1. Create an OpenWeatherMap account and copy your API key.
2. Copy `.env.example` to `.env` and set `OPENWEATHER_API_KEY` to your key. Keep `.env` private; it is ignored by Git.
3. In this folder, run `npm install` and then `npm start`.
4. Open `http://localhost:3000`, enter a city, and submit the form.

The app requests current weather in metric units and displays the temperature in Celsius, the weather description, and its icon. It reports missing configuration, unknown cities, service errors, and connection timeouts on the page.
