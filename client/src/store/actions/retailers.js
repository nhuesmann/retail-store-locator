import {
  REQUEST,
  SUCCESS,
  FAILURE,
  createRequestTypes,
  action,
} from './utility';

export const GET_RETAILERS = createRequestTypes('GET_RETAILERS');

export const getRetailers = {
  request: (origin, searchRadius) =>
    action(GET_RETAILERS[REQUEST], { origin, searchRadius }),
  success: retailers => action(GET_RETAILERS[SUCCESS], { retailers }),
  failure: error => action(GET_RETAILERS[FAILURE], { error }),
};
