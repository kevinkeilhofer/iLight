//import von React und dem Wetter
import React, { Component } from 'react';
import Weather from './weather';
//zugriff auf die colormap
let colormap = require('colormap')

export default class App extends Component {
  render() {
    return (
      <div className='row'>
         <Weather />
      </div>
    );
  }
}

