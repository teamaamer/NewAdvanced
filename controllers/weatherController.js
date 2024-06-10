import axios from "axios";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeatherByCity(req, res){
    
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    const { city } = req.query;

    if (!city) {
        return res.status(400).send({ error: 'City parameter is required' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        return res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            return res.status(500).json({ error: "No response received from OpenWeatherMap API" });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};