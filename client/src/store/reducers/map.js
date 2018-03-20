import * as ActionTypes from '../actions';

const initialState = {
  center: {
    lat: 33.913609,
    lng: -118.384909,
  },
  zoom: 11,
  hoveredMarker: null,
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

function markerHovered(state, action) {
  return {
    ...state,
    hoveredMarker: action.markerId,
  };
}

function markerHoverExited(state) {
  return {
    ...state,
    hoveredMarker: null,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_MAP_CENTER:
      return updateMapCenter(state, action);

    case ActionTypes.UPDATE_ZOOM:
      return updateZoom(state, action);

    case ActionTypes.MARKER_HOVERED:
      return markerHovered(state, action);

    case ActionTypes.MARKER_HOVER_EXITED:
      return markerHoverExited(state);

    default:
      return state;
  }
};

export default reducer;
