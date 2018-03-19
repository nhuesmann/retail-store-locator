import * as ActionTypes from '../actions';

const initialState = {
  searchOrigin: {
    address: '',
    placeId: null,
    coordinates: {
      lat: null,
      lng: null,
    },
  },
  maxDistance: 50,
};

function updateMaxDistance(state, action) {
  return {
    ...state,
    maxDistance: action.maxDistance,
  };
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

function updateOriginCoordinatesSuccess(state, action) {
  return {
    ...state,
    searchOrigin: {
      ...state.searchOrigin,
      coordinates: action.coordinates,
    },
  };
}

function updateOriginCoordinatesFailure(state) {
  return state;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_MAX_DISTANCE:
      return updateMaxDistance(state, action);

    case ActionTypes.UPDATE_ORIGIN_ADDRESS:
      return updateOriginAddress(state, action);

    case ActionTypes.UPDATE_ORIGIN_PLACE_ID:
      return updateOriginPlaceId(state, action);

    case ActionTypes.UPDATE_ORIGIN_COORDINATES.SUCCESS:
      return updateOriginCoordinatesSuccess(state, action);

    case ActionTypes.UPDATE_ORIGIN_COORDINATES.FAILURE:
      return updateOriginCoordinatesFailure(state);

    default:
      return state;
  }
};

export default reducer;
