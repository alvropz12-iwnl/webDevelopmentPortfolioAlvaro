import axios from "axios";

export const getWeatherFrom = async (lat, long, cityName) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
    const response = await axios.get(apiUrl);
    const temperature = response.data.current_weather.temperature;

    return `In ${cityName}, the current temp is ${temperature} C`;
};
