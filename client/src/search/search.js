import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SelectPackage from './select-package/select-package';
import fetchPackages from './fetchPackages/fetchPackages';
import './search.css';

export default function Search() {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState(null);

  function onSelectChanged(value) {
    setQuery(value);
  }

  function onChanged(value) {
    fetchPackages(value).then(response => {
      setOptions(response);
    });
  }

  if (query) {
    return redirectToResultPage(query);
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

function redirectToResultPage(query) {
  const url = `/result?name=${query.name}&version=${query.version}`;
  return <Redirect to={url} />;
}
