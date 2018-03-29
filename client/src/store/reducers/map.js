/* eslint object-curly-newline: 0 */
/* eslint function-paren-newline: 0 */
/* eslint no-unused-vars: 0 */

import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';
import { fitBounds } from 'google-map-react/utils';

import * as ActionTypes from '../actions';
import { truncateCoordinates, truncateBounds } from '../utilities';

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
  size: null,
  showMarkers: false,
  hoveredRetailerId: null,
  clickedRetailerId: null,
};

function handleBoundsChange(state, action) {
  const { zoom, size } = action;

  const center = truncateCoordinates(action.center);
  const bounds = truncateBounds(action.bounds);
  const marginBounds = truncateBounds(action.marginBounds);

  return { ...state, center, zoom, bounds, marginBounds, size };
}

function updateCenterAndZoom(state, action) {
  return {
    ...state,
    center: truncateCoordinates(action.center),
    zoom: action.zoom,
  };
}

function updateMapFromRetailers(state, action) {
  const { retailers, size, searchOrigin, searchRadius } = action;

  if (retailers.length === 0) {
    const MAP_RADIUS_TO_ZOOM = {
      5: 13,
      10: 12,
      25: 10,
      50: 9,
    };

    return {
      ...state,
      center: searchOrigin,
      zoom: MAP_RADIUS_TO_ZOOM[searchRadius],
    };
  }

  const locations = retailers.map(retailer =>
    retailer.location.coordinates.slice().reverse()
  );

  locations.push([searchOrigin.lat, searchOrigin.lng]);

  const line = lineString(locations);
  const boundingBox = bbox(line);

  const bounds = {
    sw: { lat: boundingBox[0], lng: boundingBox[1] },
    nw: { lat: boundingBox[2], lng: boundingBox[1] },
    se: { lat: boundingBox[0], lng: boundingBox[3] },
    ne: { lat: boundingBox[2], lng: boundingBox[3] },
  };

  const { center, zoom } = fitBounds({ nw: bounds.nw, se: bounds.se }, size);
  const truncatedCenter = truncateCoordinates(center);

  return { ...state, center: truncatedCenter, zoom };
}

function retailerHovered(state, action) {
  return {
    ...state,
    hoveredRetailerId: action.retailerId,
  };
}

function retailerHoverExited(state) {
  return {
    ...state,
    hoveredRetailerId: null,
  };
}

function retailerClicked(state, action) {
  return {
    ...state,
    clickedRetailerId: action.retailerId,
  };
}

function mapClicked(state) {
  return { ...state, clickedRetailerId: null };
}

function zoomAnimationStarted(state) {
  return { ...state, showMarkers: false };
}

function zoomAnimationEnded(state) {
  return { ...state, showMarkers: true };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_BOUNDS_CHANGE:
      return handleBoundsChange(state, action);

    case ActionTypes.UPDATE_CENTER_AND_ZOOM:
      return updateCenterAndZoom(state, action);

    case ActionTypes.UPDATE_MAP_FROM_RETAILERS:
      return updateMapFromRetailers(state, action);

    case ActionTypes.RETAILER_HOVERED:
      return retailerHovered(state, action);

    case ActionTypes.RETAILER_HOVER_EXITED:
      return retailerHoverExited(state);

    case ActionTypes.RETAILER_CLICKED:
      return retailerClicked(state, action);

    case ActionTypes.MAP_CLICKED:
      return mapClicked(state);

    case ActionTypes.ZOOM_ANIMATION_STARTED:
      return zoomAnimationStarted(state);

    case ActionTypes.ZOOM_ANIMATION_ENDED:
      return zoomAnimationEnded(state);

    default:
      return state;
  }
};

export default reducer;
