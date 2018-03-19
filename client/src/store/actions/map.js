import { action } from './utility';

export const UPDATE_MAP_CENTER = 'UPDATE_MAP_CENTER';
export const UPDATE_ZOOM = 'UPDATE_ZOOM';

export const updateMapCenter = center => action(UPDATE_MAP_CENTER, { center });
export const updateZoom = zoom => action(UPDATE_ZOOM, { zoom });
