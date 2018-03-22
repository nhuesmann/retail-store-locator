/* eslint object-curly-newline: 0 */

import { action } from './utility';

// export const UPDATE_MAP_CENTER = 'UPDATE_MAP_CENTER';
// export const UPDATE_ZOOM = 'UPDATE_ZOOM';
export const UPDATE_CENTER_AND_ZOOM = 'UPDATE_CENTER_AND_ZOOM';
export const HANDLE_BOUNDS_CHANGE = 'HANDLE_BOUNDS_CHANGE';
export const MARKER_HOVERED = 'MARKER_HOVERED';
export const MARKER_HOVER_EXITED = 'MARKER_HOVER_EXITED';

// export const updateMapCenter = center => action(UPDATE_MAP_CENTER, { center });
// export const updateZoom = zoom => action(UPDATE_ZOOM, { zoom });
export const updateCenterAndZoom = (center, zoom) =>
  action(UPDATE_CENTER_AND_ZOOM, { center, zoom });
export const handleBoundsChange = (center, zoom, bounds, marginBounds, size) =>
  action(HANDLE_BOUNDS_CHANGE, { center, zoom, bounds, marginBounds, size });
export const markerHovered = markerId => action(MARKER_HOVERED, { markerId });
export const markerHoverExited = () => action(MARKER_HOVER_EXITED);
