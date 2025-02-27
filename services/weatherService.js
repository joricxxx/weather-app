
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
    const apiKey = process.env.NUXT_ENV_OPEN_WEATHER_API_KEY; // Ensure your API key is stored in .env
    try {
        const response = await axios.get(`${API_URL}?q=${city}&appid=${apiKey}&units=metric`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};