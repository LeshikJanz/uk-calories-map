import { compose, withState, withHandlers } from 'recompose';
import { EARTH_RADIUS } from "../constants";
import { CaloriesCalculator } from "../components/index";
import {
  CALORIES_BURNING_COEFFICIENT, DONE_TYPING_INTERVAL
} from "../constants/index";
import { fetchDistance, fetchPlace } from "../api/index";

let typingTimer;

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

const getMinDistance = (journeys) => {
  const pathes =
    journeys.map((e) =>
      convertPositionsToArray(
        e.legs.reduce((lineSum, l) => lineSum + l.path.lineString, '')
      )
    );
  const distances = pathes
    .map(path =>
      path.reduce((sum, p, i, arr) =>
          arr[i + 1] ?
            sum + getDistanceFromLatLonInKm(...arr[i].split(','), ...arr[i + 1].split(','))
            : sum
        , 0)
    );

  return Math.min(...distances);
};

export default compose(
  withState('calories', 'handleCalories', 0),
  withState('startPos', 'handleStartPos', { value: '' }),
  withState('endPos', 'handleEndPos', { value: '' }),
  withState('startPosOptions', 'handleStartPosOptions', ''),
  withState('endPosOptions', 'handleEndPosOptions', ''),
  withHandlers({
    handleStartPositionSearch: ({ handleStartPos, handleStartPosOptions }) => ({ target }) => {
      handleStartPos(target);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(
        () => target.value &&
        fetchPlace(target.value)
          .then(result => handleStartPosOptions(result.matches)
          ), DONE_TYPING_INTERVAL);
    },
    handleEndPositionSearch: ({ handleEndPos, handleEndPosOptions }) => ({ target }) => {
      handleEndPos(target);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(
        () => target.value &&
        fetchPlace(target.value)
          .then(result => handleEndPosOptions(result.matches)
          ), DONE_TYPING_INTERVAL);
    },
    handleStartPosMenuSelect: ({ handleStartPos, handleStartPosOptions }) => (option) => {
      handleStartPos({ ...option, value: option.name });
      handleStartPosOptions([]);
    },
    handleEndPosMenuSelect: ({ handleEndPos, handleEndPosOptions }) => (option) => {
      handleEndPos({ ...option, value: option.name });
      handleEndPosOptions([]);
    },
    calculateCalories: ({ handleCalories, startPos, endPos }) => (e) => {
      e.preventDefault();
      const { bodyWeight } = e.target.elements;
      fetchDistance(+startPos.icsId, +endPos.icsId)
        .then(result => {
            const minDistance = result && getMinDistance(result.journeys);
            const burnedCalories = minDistance * bodyWeight.value * CALORIES_BURNING_COEFFICIENT;
            handleCalories(burnedCalories);
          }
        );
    }
  })
)(CaloriesCalculator);