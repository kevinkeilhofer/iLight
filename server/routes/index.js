const express = require('express');
const router = express.Router();
const weather = require('./weather');

module.exports = function(io) {

  io.on('connection', socket => {

     const latitude = socket.handshake.query['latitude'], longitude = socket.handshake.query['longitude'];
   
     getWeather( latitude, longitude, socket );

     setInterval(
       () => getWeather( latitude, longitude, socket ),
     10000);

  });

  function getWeather( latitude, longitude, socket ) {
    console.log( latitude + ',' + longitude );
    if( typeof latitude !== 'undefined' && typeof longitude !== 'undefined' ) {
        weather.weather( latitude, longitude ).then( response => {
           socket.emit('weather', { 'id' : response.weather[0].id, 'description' : response.weather[0].description, 'name' : response.name, 'temp' : Math.round( ( response.main.temp - 273.15), 0 ), 'sunrise' : response.sys.sunrise, 'sunset' : response.sys.sunset });
        });
    }
  }

  return router;

};