import { API_ID, APP_KEY, PLACE_SEARCH_REPLACE_PARAM, PLACE_SEARCH_URL, DISTANCE_URL } from "../constants/index";

export const fetchPlace = (place) =>
  fetch(PLACE_SEARCH_URL.replace(PLACE_SEARCH_REPLACE_PARAM, place), {
    "api_id": API_ID,
    "app_key": APP_KEY,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });

export const fetchDistance = (startPosition, endPosition) =>
  fetch(DISTANCE_URL
      .replace("{startPosition}", startPosition)
      .replace("{endPosition}", endPosition),
    {
      "api_id": API_ID,
      "app_key": APP_KEY
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
