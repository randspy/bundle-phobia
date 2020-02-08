import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';

class App extends React.Component {
  callAPI() {
    fetch("http://localhost:5000/users")
      .then(res => res.text())
      .then(res => console.log(res));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return <div>Hello</div>;
  }

}
ReactDOM.render(<App />, document.getElementById('root'));
