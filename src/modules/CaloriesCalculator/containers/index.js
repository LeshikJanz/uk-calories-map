import React from 'react';
import { compose, lifecycle, withState, withHandlers, withProps } from 'recompose';
import { EARTH_RADIUS } from "../constants";
import { CaloriesCalculator } from "../components/index";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const distanceLatitude = deg2rad(lat2 - lat1);  // deg2rad below
  const distanceLongitude = deg2rad(lon2 - lon1);
  const a =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c; // Distance in km
};

const deg2rad = (deg) => deg * (Math.PI / 180);

const convertPositionsToArray = (lineString) =>
  lineString
    .match(/\[\S{1,},\s\S{1,}\]/g)
    .map(l => l.replace(/\[|\]/g, ''));

export default compose(
  withState('handleCalories', 'calories', 0),
  withHandlers({
    calculateCalories: () => (journeys) => {
      const pathes =
        journeys.map((e) =>
          convertPositionsToArray(
            e.legs.reduce((lineSum, l) => lineSum + l.path.lineString, '')
          )
        );
      const distances = pathes
        .map(path =>
          path.reduce((sum, p, i, arr) =>
            arr[i + 1]
            && sum + getDistanceFromLatLonInKm(...arr[i].split(','), ...arr[i + 1].split(','))
            || sum
            , 0)
        );

      const minDistance = Math.min(...distances);
      console.log('minDistance');
      console.log(minDistance);
    }
  })
)
(CaloriesCalculator);