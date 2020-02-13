import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../search/search';
import Result from '../result/result';

export default function BundlePhobia() {
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
