import React from 'react';
const mocks = require('../../../assets/test.json');

export const CaloriesCalculator = ({ calculateCalories }) => {

  return (<div>
    <button onClick={() => calculateCalories(mocks.journeys)}>
      Calculate calories
    </button>
  </div>)
}