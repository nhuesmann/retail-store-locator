/* eslint object-curly-newline: 0 */
/* eslint function-paren-newline: 0 */
/* eslint no-unused-vars: 0 */

import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';
import { fitBounds } from 'google-map-react/utils';

import * as ActionTypes from '../actions';

const initialState = {
  zoom: null,
  center: null,
  bounds: {
    ne: { lat: null, lng: null },
    nw: { lat: null, lng: null },
    se: { lat: null, lng: null },
    sw: { lat: null, lng: null },
  },
  marginBounds: {
    ne: { lat: null, lng: null },
    nw: { lat: null, lng: null },
    se: { lat: null, lng: null },
    sw: { lat: null, lng: null },
  },
  hoveredMarker: null,
  size: null,
};

function handleBoundsChange(state, action) {
  const { center, zoom, bounds, marginBounds, size } = action;

  return { ...state, center, zoom, bounds, marginBounds, size };
}

function updateCenterAndZoom(state, action) {
  return {
    ...state,
    center: action.center,
    zoom: action.zoom,
  };
}

function updateMapFromRetailers(state, action) {
  const { retailers, size } = action;

  const locations = retailers.map(retailer =>
    retailer.location.coordinates.slice().reverse()
  );

  if (locations.length === 1) {
    return {
      ...state,
      center: { lat: locations[0][0], lng: locations[0][1] },
      zoom: 14,
    };
  }

  const line = lineString(locations);
  const boundingBox = bbox(line);

  const bounds = {
    sw: { lat: boundingBox[0], lng: boundingBox[1] },
    nw: { lat: boundingBox[2], lng: boundingBox[1] },
    se: { lat: boundingBox[0], lng: boundingBox[3] },
    ne: { lat: boundingBox[2], lng: boundingBox[3] },
  };

  const { center, zoom } = fitBounds({ nw: bounds.nw, se: bounds.se }, size);

  return {
    ...state,
    center,
    zoom,
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
    case ActionTypes.HANDLE_BOUNDS_CHANGE:
      return handleBoundsChange(state, action);

    case ActionTypes.UPDATE_CENTER_AND_ZOOM:
      return updateCenterAndZoom(state, action);

    case ActionTypes.UPDATE_MAP_FROM_RETAILERS:
      return updateMapFromRetailers(state, action);

    case ActionTypes.MARKER_HOVERED:
      return markerHovered(state, action);

    case ActionTypes.MARKER_HOVER_EXITED:
      return markerHoverExited(state);

    default:
      return state;
  }
};

export default reducer;
