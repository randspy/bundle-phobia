import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../loader/loader';
import SelectPackage from './select-package/select-package';
import fetchPackages from './fetchPackages/fetchPackages';
import BundleStore from '../store/bundle.store';
import './search.css';

export default function Search() {
  let store = BundleStore.useStore();
  const [options, setOptions] = useState([]);

  function onSelectChanged(value) {
    store.set('packageName')(value.name);
  }

  function onChanged(value) {
    fetchPackages(value).then(response => {
      setOptions(response);
    });
  }

  if (store.get('bundles').length) {
    return redirectToResultPage(store.get('packageName'));
  }

  if (store.get('loading')) {
    return <Loader />;
  }

  return (
    <div className="search">
      <div>
        <div className="search--title">
          BUNDLE<div className="search--secondary-title">PHOBIA</div>
        </div>
        <div className="search--subtitle">
          find the cost of adding a npm package to your bundle
        </div>
        <div>
          <SelectPackage
            options={options}
            onSelect={onSelectChanged}
            onChange={onChanged}
          />
        </div>
      </div>
    </div>
  );
}

function redirectToResultPage(packageName) {
  const url = `/result?name=${packageName}`;
  return <Redirect to={url} />;
}
