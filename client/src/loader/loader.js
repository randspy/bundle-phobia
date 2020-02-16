import React from 'react';
import ReactLoader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './loader.css';

export default function Loader() {
  return (
    <div className="loader">
      <ReactLoader type="Grid" color="black" height={40} width={40} />
    </div>
  );
}
