import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import BundlePhobia from './bundle-phobia/bundle-phobia';
import './styles/styles.css';

ReactDOM.render(
  <Router>
    <BundlePhobia />
  </Router>,
  document.getElementById('root')
);
