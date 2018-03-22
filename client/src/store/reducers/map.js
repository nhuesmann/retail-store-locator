/* eslint object-curly-newline: 0 */

import * as ActionTypes from '../actions';

const initialState = {
  center: {
    lat: 33.913609,
    lng: -118.384909,
  },
  bounds: {
    ne: { lat: null, lng: null },
    nw: { lat: null, lng: null },
    se: { lat: null, lng: null },
    sw: { lat: null, lng: null },
  },
  zoom: 11,
  hoveredMarker: null,
};

// function updateMapCenter(state, action) {
//   return {
//     ...state,
//     center: action.center,
//   };
// }

// function updateZoom(state, action) {
//   return {
//     ...state,
//     zoom: action.zoom,
//   };
// }

function updateCenterAndZoom(state, action) {
  return {
    ...state,
    center: action.center,
    zoom: action.zoom,
  };
}

function handleBoundsChange(state, action) {
  const { center, zoom, bounds, marginBounds, size } = action;

  return { ...state, center, zoom, bounds, marginBounds, size };
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
    // case ActionTypes.UPDATE_MAP_CENTER:
    //   return updateMapCenter(state, action);

    // case ActionTypes.UPDATE_ZOOM:
    //   return updateZoom(state, action);

    case ActionTypes.UPDATE_CENTER_AND_ZOOM:
      return updateCenterAndZoom(state, action);

    case ActionTypes.HANDLE_BOUNDS_CHANGE:
      return handleBoundsChange(state, action);

    case ActionTypes.MARKER_HOVERED:
      return markerHovered(state, action);

    case ActionTypes.MARKER_HOVER_EXITED:
      return markerHoverExited(state);

    default:
      return state;
  }
};

export default reducer;
