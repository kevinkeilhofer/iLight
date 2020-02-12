import React, { Component } from 'react';
import io from "socket.io-client";
const colormap = require("colormap");


export default class Weather extends Component {
   constructor(props){
      super(props);
      this.state = { weather: [], loader: { display: 'block' } }
          this.colors = colormap({
              colormap: 'blackbody',
              nshades: 70,
              format: 'hex',
              alpha: 1
      // this.colors = colormap({
      //     colormap: 'spring',
      //     nshades: 10,
      //     format: 'hex',
      //     alpha: 1
          })

      console.log(this.colors)
   }
   componentDidMount(){
      this._isMounted = true;
      this.getCurrentPosition().then( res => {
          this.socket = io('http://localhost:9000', { query: 'latitude=' + res.coords.latitude + '&longitude=' + res.coords.longitude , transports: [ 'websocket', 'polling', 'flashsocket' ] });
          this.socket.on('weather', response => {
              if (this._isMounted) this.setState({ weather: response, loader: { display: 'none' } });
          });
      });
   }
   componentWillUnmount() {
      this._isMounted = false;
   }
   getCurrentPosition(options = {}){
      if ( navigator.geolocation) {
          return new Promise(
            (resolve, reject) => navigator.geolocation.getCurrentPosition( resolve, reject )
          )
      } else {
          return new Promise(
            resolve => resolve({})
          )
      }
   };
    // Colormap mappen zu der Temperatur
    map(val, at_low1, to_high1, at_low2, to_high2) {
        return (val - at_low1) / (to_high1 - at_low1) * (to_high2 - at_low2) + at_low2;
    }

   displayWeather(){
      let date = new Date(), sunrise = new Date(this.state.weather.sunrise * 1000), sunset = new Date(this.state.weather.sunset * 1000), icon, style = { margin: '10px 0' };      
      if ( date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
           icon = `wi wi-owm-day-${this.state.weather.id}`;
      }
      if ( date.getHours() >= sunset.getHours()) {
           icon = `wi wi-owm-night-${this.state.weather.id}`;
      }

      if( Object.keys(this.state.weather).length > 0 ) {
          console.log(this.state.weather)
          const minTemp = -30;
          const maxTemp = 40;

          let colorIndex = Math.floor(this.map(this.state.weather.temp,minTemp,maxTemp,0,this.colors.length));

          


          return(
            <div style={style}>
              <h1 className="weather-icon"><i className={icon}></i></h1>
              <h2 className="location-namer">{this.state.weather.name}</h2>
              <h4 className="weather-description">{this.state.weather.description}, {this.state.weather.temp}<i className="wi wi-degrees"></i></h4>
              <div id="test" style={{backgroundColor: this.colors[colorIndex]}}></div>
            </div>
          );
      }
   }
   render(){
      return(
         <div className="col-lg-12 col-md-12 text-center">
            <p style={this.state.loader}>Loading...</p>
            { this.displayWeather() }
         </div>
      );
   }
}