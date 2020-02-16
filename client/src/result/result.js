import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BundleStats from './bundle-stats/bundle-stats';
import Graph from './graph/graph';
import useQuery from './services/use-query/use-query';
import BundleStore from '../store/bundle.store';
import Loader from '../loader/loader';
import './result.css';

export default function Result(props) {
  let store = BundleStore.useStore();
  let query = useQuery();

  useEffect(() => {
    store.set('packageName')(query.name);
  }, []);

  function backButtonHandle() {
    store.set('bundles')([]);
  }

  if (store.get('loading')) {
    return <Loader />;
  }

  if (store.get('error')) {
    return <Redirect to="/" />;
  }

  return (
    <div className="result">
      <Link to="/">
        <div className="result--back-button" onClick={backButtonHandle}>
          BUNDLE<div className="result--secondary-back-button">PHOBIA</div>
        </div>
      </Link>
      <div className="result--content">
        <BundleStats
          minified={store.get('bundleStats').minified}
          gzip={store.get('bundleStats').gzip}
        />
        <Graph bundles={store.get('bundles')} />
      </div>
    </div>
  );
}
