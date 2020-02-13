import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BundleStats from './bundle-stats/bundle-stats';
import fromApi from './from-api/from-api';
import useQuery from './use-query/use-query';
import fetchBundles from './fetch-bundles/fetch-bundles';
import './result.css';

export default function Result() {
  let query = useQuery();
  let [bundle, setBundle] = useState({
    minified: 0,
    gzip: 0
  });

  useEffect(() => {
    fetchBundles(query.name, query.version).then(result => {
      const data = fromApi(result);
      if (data.length) {
        setBundle(data[data.length - 1]);
      }
    });
  }, []);

  return (
    <div className="result">
      <Link to="/">
        <div className="result--back-button">
          BUNDLE<div className="result--secondary-back-button">PHOBIA</div>
        </div>
      </Link>
      <div className="result--content">
        <BundleStats minified={bundle.minified} gzip={bundle.gzip} />
      </div>
    </div>
  );
}
