import React from 'react';
import './graph.css';
import { Tooltip } from 'react-tippy';
import toKB from '../services/to-kb/to-kb';

export default function Graph(props) {
  return (
    <div className="graph">
      {props.bundles.map(item => {
        return (
          <div key={item.version}>
            <div className="graph-bundle">
              <div className="graph-version">
                <div className="graph-version-text">{item.version}</div>
              </div>
              <div className="graph-col">
                <Tooltip
                  title={`Minified ${toKB(item.minified)}kB | Gzipped ${toKB(
                    item.gzip
                  )}kB`}
                  position="top"
                  delay="500">
                  <div
                    className="graph-minified"
                    style={{ width: item.minifiedPercentage }}></div>{' '}
                  <div
                    className="graph-gzip"
                    style={{ width: item.gzipPercentage }}></div>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
