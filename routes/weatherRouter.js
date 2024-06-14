import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {getWeatherByCity} from '../controllers/weatherController.js'


const weather = express.Router();

weather.get('/city',authMiddleware,getWeatherByCity);
export default weather; 