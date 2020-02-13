import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BundleStats from './bundle-stats/bundle-stats';
import Graph from './graph/graph';
import fromApi from './services/from-api/from-api';
import useQuery from './services/use-query/use-query';
import fetchBundles from './services/fetch-bundles/fetch-bundles';
import './result.css';

export default function Result() {
  let query = useQuery();
  let [bundles, setBundles] = useState([]);
  let [selectedBundle, setSelectedBundle] = useState({
    minified: 0,
    gzip: 0
  });

  useEffect(() => {
    fetchBundles(query.name, query.version).then(result => {
      const data = fromApi(result);
      if (data.length) {
        setSelectedBundle(data[data.length - 1]);
        setBundles(data);
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
        <BundleStats
          minified={selectedBundle.minified}
          gzip={selectedBundle.gzip}
        />
        <Graph bundles={bundles} />
      </div>
    </div>
  );
}
