import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import SelectPackage from './select-package/select-package';
import fetchPackages from './fetchPackages/fetchPackages';
import './search.css';

export default function Search() {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState(null);
  let isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  function onSelectChanged(value) {
    setQuery(value);
  }

  function onChanged(value) {
    fetchPackages(value).then(response => {
      // to be sure that we don't change state when the component is unmounted
      if (isMounted.current) {
        setOptions(response);
      }
    });
  }

  if (query) {
    const url = `/result?p=${query.name}@${query.version}`;
    return <Redirect to={url} />;
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
