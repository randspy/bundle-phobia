import React from 'react';
import toKB from '../services/to-kb/to-kb';
import './bundle-stats.css';

export default function BundleStats(props) {
  return (
    <div className="bundle-stats">
      <div className="bundle-stats--label bundle-stats--center">
        BUNDLE SIZE
      </div>
      <div className="bundle-stats--size">
        <div className="bundle-stats--group">
          <div className="bundle-stats--minified">
            <div className="bundle-stats--number">{toKB(props.minified)}</div>
            <div className="bundle-stats--unit">kB</div>
          </div>
          <div className="bundle-stats--center">Minified</div>
        </div>
        <div className="bundle-stats--group">
          <div className="bundle-stats--gzip">
            <div className="bundle-stats--number">{toKB(props.gzip)}</div>
            <div className="bundle-stats--unit">kB</div>
          </div>
          <div className="bundle-stats--center">Minified + Gzipped</div>
        </div>
      </div>
    </div>
  );
}
