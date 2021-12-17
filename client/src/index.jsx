// Importacion se semantic UI React
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';

import './scss/colors.sass'
import './scss/index.sass'


import MainComponent from './main'
ReactDOM.render(
  <MainComponent />,
  document.getElementById('app')
);
