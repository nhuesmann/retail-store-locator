import * as ActionTypes from '../actions';

const initialState = {
  center: {
    lat: 33.913609,
    lng: -118.384909,
  },
  zoom: 11,
};

function updateMapCenter(state, action) {
  return {
    ...state,
    center: action.center,
  };
}

function updateZoom(state, action) {
  return {
    ...state,
    zoom: action.zoom,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_MAP_CENTER:
      return updateMapCenter(state, action);

    case ActionTypes.UPDATE_ZOOM:
      return updateZoom(state, action);

    default:
      return state;
  }
};

export default reducer;
