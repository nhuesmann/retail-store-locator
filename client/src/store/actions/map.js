/* eslint object-curly-newline: 0 */

import { action } from './utility';

export const UPDATE_CENTER_AND_ZOOM = 'UPDATE_CENTER_AND_ZOOM';
export const HANDLE_BOUNDS_CHANGE = 'HANDLE_BOUNDS_CHANGE';
export const UPDATE_MAP_FROM_RETAILERS = 'UPDATE_MAP_FROM_RETAILERS';
export const MARKER_HOVERED = 'MARKER_HOVERED';
export const MARKER_HOVER_EXITED = 'MARKER_HOVER_EXITED';

export const updateCenterAndZoom = (center, zoom) =>
  action(UPDATE_CENTER_AND_ZOOM, { center, zoom });
export const handleBoundsChange = (center, zoom, bounds, marginBounds, size) =>
  action(HANDLE_BOUNDS_CHANGE, { center, zoom, bounds, marginBounds, size });
export const updateMapFromRetailers = (retailers, size) =>
  action(UPDATE_MAP_FROM_RETAILERS, { retailers, size });
export const markerHovered = markerId => action(MARKER_HOVERED, { markerId });
export const markerHoverExited = () => action(MARKER_HOVER_EXITED);
