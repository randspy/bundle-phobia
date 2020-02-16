import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../search/search';
import Result from '../result/result';
import BundleStore from '../store/bundle.store';

export default function BundlePhobia() {
  return (
    <div>
      <BundleStore.Container>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
        </Switch>
      </BundleStore.Container>
    </div>
  );
}
