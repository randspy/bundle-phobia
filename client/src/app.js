import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './styles/styles.css';

class App extends React.Component {
  render() {
    return <Router><div>Hello</div></Router>;
  }

}
ReactDOM.render(<App />, document.getElementById('root'));
