import {
  REQUEST,
  SUCCESS,
  FAILURE,
  createRequestTypes,
  action,
} from './utility';

export const UPDATE_ORIGIN_COORDINATES = createRequestTypes(
  'UPDATE_ORIGIN_COORDINATES'
);

export const UPDATE_ORIGIN_ADDRESS = 'UPDATE_ORIGIN_ADDRESS';
export const UPDATE_ORIGIN_PLACE_ID = 'UPDATE_ORIGIN_PLACE_ID';
export const UPDATE_SEARCH_RADIUS = 'UPDATE_SEARCH_RADIUS';
export const SEARCH_COMPLETED = 'SEARCH_COMPLETED';

export const updateOriginCoordinates = {
  request: (address, placeId) =>
    action(UPDATE_ORIGIN_COORDINATES[REQUEST], { address, placeId }),
  success: coordinates =>
    action(UPDATE_ORIGIN_COORDINATES[SUCCESS], { coordinates }),
  failure: error => action(UPDATE_ORIGIN_COORDINATES[FAILURE], { error }),
};

export const updateOriginAddress = address =>
  action(UPDATE_ORIGIN_ADDRESS, {
    address,
  });

export const updateOriginPlaceId = placeId =>
  action(UPDATE_ORIGIN_PLACE_ID, {
    placeId,
  });

export const updateSearchRadius = selectedValue =>
  action(UPDATE_SEARCH_RADIUS, {
    selectedValue,
  });

export const searchCompleted = () => action(SEARCH_COMPLETED);
