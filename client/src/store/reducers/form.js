import * as ActionTypes from '../actions';
import { truncateCoordinates } from '../utilities';

const initialState = {
  searchOrigin: {
    address: '',
    placeId: null,
    coordinates: {
      lat: null,
      lng: null,
    },
  },
  searchRadiusOptions: [5, 10, 25, 50],
  searchRadiusSelectedIndex: 3,
  searchCompleted: false,
};

function updateOriginCoordinatesSuccess(state, action) {
  return {
    ...state,
    searchOrigin: {
      ...state.searchOrigin,
      coordinates: truncateCoordinates(action.coordinates),
    },
  };
}

function updateOriginCoordinatesFailure(state) {
  return state;
}

function updateOriginAddress(state, action) {
  return {
    ...state,
    searchOrigin: {
      ...state.searchOrigin,
      address: action.address,
    },
  };
}

function updateOriginPlaceId(state, action) {
  return {
    ...state,
    searchOrigin: {
      ...state.searchOrigin,
      placeId: action.placeId,
    },
  };
}

function updateSearchRadius(state, action) {
  const selectedIndex = state.searchRadiusOptions.indexOf(
    +action.selectedValue
  );

  return { ...state, searchRadiusSelectedIndex: selectedIndex };
}

function searchCompleted(state) {
  return {
    ...state,
    searchCompleted: true,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ORIGIN_COORDINATES.SUCCESS:
      return updateOriginCoordinatesSuccess(state, action);

    case ActionTypes.UPDATE_ORIGIN_COORDINATES.FAILURE:
      return updateOriginCoordinatesFailure(state);

    case ActionTypes.UPDATE_ORIGIN_ADDRESS:
      return updateOriginAddress(state, action);

    case ActionTypes.UPDATE_ORIGIN_PLACE_ID:
      return updateOriginPlaceId(state, action);

    case ActionTypes.UPDATE_SEARCH_RADIUS:
      return updateSearchRadius(state, action);

    case ActionTypes.SEARCH_COMPLETED:
      return searchCompleted(state);

    default:
      return state;
  }
};

export default reducer;
