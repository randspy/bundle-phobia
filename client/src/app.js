import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.css';
import Search from './search/search';
import Result from './result/result';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
