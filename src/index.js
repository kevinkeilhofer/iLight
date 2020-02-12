import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './styles/weather-icons.min.css';

ReactDOM.render(<App />, document.querySelector('.container'));