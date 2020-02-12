import React, { Component } from 'react';
import Weather from './weather';
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

