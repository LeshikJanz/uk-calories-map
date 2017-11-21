import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CaloriesCalculator from "./modules/CaloriesCalculator/containers";

class App extends Component {
  render() {

    return (
      <div className="App">
        <CaloriesCalculator/>
      </div>
    );
  }
}

export default App;
