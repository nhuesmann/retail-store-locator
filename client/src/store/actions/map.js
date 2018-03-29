/* eslint object-curly-newline: 0 */

import { action } from './utility';

export const UPDATE_CENTER_AND_ZOOM = 'UPDATE_CENTER_AND_ZOOM';
export const HANDLE_BOUNDS_CHANGE = 'HANDLE_BOUNDS_CHANGE';
export const UPDATE_MAP_FROM_RETAILERS = 'UPDATE_MAP_FROM_RETAILERS';
export const RETAILER_HOVERED = 'RETAILER_HOVERED';
export const RETAILER_HOVER_EXITED = 'RETAILER_HOVER_EXITED';
export const RETAILER_CLICKED = 'RETAILER_CLICKED';
export const MAP_CLICKED = 'MAP_CLICKED';
export const ZOOM_ANIMATION_STARTED = 'ZOOM_ANIMATION_STARTED';
export const ZOOM_ANIMATION_ENDED = 'ZOOM_ANIMATION_ENDED';

export const updateCenterAndZoom = (center, zoom) =>
  action(UPDATE_CENTER_AND_ZOOM, { center, zoom });

export const handleBoundsChange = (center, zoom, bounds, marginBounds, size) =>
  action(HANDLE_BOUNDS_CHANGE, { center, zoom, bounds, marginBounds, size });

export const updateMapFromRetailers = (
  retailers,
  size,
  searchOrigin,
  searchRadius
) =>
  action(UPDATE_MAP_FROM_RETAILERS, {
    retailers,
    size,
    searchOrigin,
    searchRadius,
  });

export const retailerHovered = retailerId =>
  action(RETAILER_HOVERED, { retailerId });

export const retailerHoverExited = () => action(RETAILER_HOVER_EXITED);

export const retailerClicked = retailerId =>
  action(RETAILER_CLICKED, { retailerId });

export const mapClicked = () => action(MAP_CLICKED);

export const zoomAnimationStarted = () => action(ZOOM_ANIMATION_STARTED);

export const zoomAnimationEnded = () => action(ZOOM_ANIMATION_ENDED);
