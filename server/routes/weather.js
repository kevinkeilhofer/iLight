//greift auf die Wetterdaten zu, durch die API von openweathermap
const axios = require('axios');
const API_KEY = '5430c95d06f64373b52090faeea3e38c';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

async function weather(lat,lon) {
   try {
     const url = `${ROOT_URL}&lat=${lat}&lon=${lon}`;
     const weather_data = await axios(url);

     return weather_data.data;
   } catch (e) {
     console.error(e);
   }
}

module.exports.weather = weather;