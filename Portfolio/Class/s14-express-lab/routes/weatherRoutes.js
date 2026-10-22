import express from "express";
import { getWeatherFrom } from "../services/meteo-service.js";
import { WeatherError } from "../errors/error-handler.js";

const router = express.Router();

const cities = {
    GDL: { lat: 20.6597, long: -103.349, name: "Guadalajara" },
    LSN: { lat: 46.52, long: 6.63, name: "Lausanne" }
};

router.get("/:city", async (req, res, next) => {
    const city = req.params.city.toUpperCase();
    const location = cities[city];

    if (!location) {
        return next(new WeatherError("Invalid city code. Use GDL or LSN.", 400));
    }

    try {
        const result = await getWeatherFrom(location.lat, location.long, location.name);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

export default router;
