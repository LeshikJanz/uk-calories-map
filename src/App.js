import React, { Component } from 'react';
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
